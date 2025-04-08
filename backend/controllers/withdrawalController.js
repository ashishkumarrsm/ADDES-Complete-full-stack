

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/cathAsyncErrorsMiddleware");
const dotenv = require("dotenv");
const db = require("../config/database");
const asyncHandler = require("express-async-handler");
const fetchSetRoiFromAdminSettings = require("../utils/settings");
dotenv.config({ path: "backend/config/config.env" });


exports.getListOfWithdrawalRequest = catchAsyncErrors(
  async (request, response, next) => {
  let sql = `SELECT withdrawal_request.*, users.email,users.bep20, users.trc20 FROM withdrawal_request LEFT JOIN users ON withdrawal_request.user_id = users.id;`;
    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error fetching withdrawal_request:", err);
        return next(
          new ErrorHandler("Error fetching withdrawal_request!", 500)
        );
      }
      if (result.length > 0) {
        return response.status(200).json({ allwithdrawal: result });
      } else {
        return response.status(200).json({ allwithdrawal: [] });
      }
    });
  }
);
exports.getListOfWithdrawalRequestById = catchAsyncErrors(
  async (request, response, next) => {
    const { user_id } = request.params;

    let sql =`SELECT withdrawal_request.*, users.email,users.email,users.bep20, users.trc20
    FROM withdrawal_request
    LEFT JOIN users ON withdrawal_request.user_id = users.id where user_id = '${user_id}'`; ;
    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error fetching withdrawal_request:", err);
        return next(
          new ErrorHandler("Error fetching withdrawal_request!", 500)
        );
      }
      if (result.length > 0) {
        return response.status(200).json({ singleWithdrawal: result });
      } else {
        return response.status(200).json({ singleWithdrawal: [] });
      }
    });
  }
);

exports.updateWithdrawalRequest = asyncHandler(async (req, res, next) => {
    const { status, amount, user_id ,type} = req.body;
    const { id } = req.params;

    const updateWithdrawalSql = `UPDATE withdrawal_request SET status = ?, acceptat = NOW() WHERE id = ?`;
    db.query(updateWithdrawalSql, [status, id], (err, depositeResult) => {
      if (err) {
        console.error("Error updating user_deposite:", err);
        return next(new ErrorHandler("Error updating user_deposite", 500));
      }

      // Check if update was successful
      if (depositeResult.affectedRows === 0) {
        return next(new ErrorHandler("No user_deposite found or no changes applied", 404));
      }

      // If status is 'complete', update the users table business column
      if (status === 'decline') {
        const updateBusinessSql = `UPDATE users SET non_working = non_working + ? WHERE id = ?`;
        db.query(updateBusinessSql, [amount, user_id], (err, userResult) => {
          if (err) {
            console.error("Error updating user's business balance:", err);
            return next(new ErrorHandler("Error updating user's business balance", 500));
          }

          // Check if update was successful
          if (userResult.affectedRows === 0) {
            return next(new ErrorHandler("No user found or no changes applied to business balance", 404));
          }

          // Respond with success message
          res.status(200).json({ success: true, message: "Update successful" });
        });
      } else {
        // If status is not 'complete', respond with success message for deposite update
        res.status(200).json({ success: true, message: "Update successful for withdrawal_request" });
      }
    });
});

exports.deleteWithdrawalRequest = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(
      new ErrorHandler("withdrawal_request number (ID) is required", 400)
    );
  }

  const sql = `DELETE FROM withdrawal_request WHERE id = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error during deletion:", err);
      return next(new ErrorHandler("Error during deletion", 500));
    }

    if (result.affectedRows > 0) {
      res.status(200).json({ success: true, message: "Deletion successful" });
    } else {
      return next(
        new ErrorHandler(
          "withdrawal_request not found or no changes applied",
          404
        )
      );
    }
  });
});

exports.addWithdrawalRequest = catchAsyncErrors(async (request, response, next) => {
  const { user_id, amount } = request.body;
  console.log(user_id, amount)
  // Check if the amount is less than 30
  if (amount < 20) {
    return response.status(400).json({ message: "Amount less than 30 is not allowed" });
  }
  const { setwithdrawal } = await fetchSetRoiFromAdminSettings();

  if (setwithdrawal !== 1) {
    return response.status(404).json({ message: "UseAdmin not allowed ROI" });
  }
  const checkBalanceSql = `SELECT non_working FROM users WHERE id = ?`;
  db.query(checkBalanceSql, [user_id], (err, results) => {
    if (err) {
      console.error("Error during balance check:", err);
      return next(new ErrorHandler("Error during balance check!", 500));
    }

    if (results.length === 0) {
      return response.status(404).json({ message: "User not found" });
    }

    const { non_working } = results[0];
    console.log(non_working)
    if (non_working < amount) {
      return response.status(400).json({ message: "Insufficient funds in non_working balance" });
    }

    // Deduct the amount from non_working
    let remainingAmount = amount;
    let deductionAmount = amount * 0.05; // 5% admin charge
    let amountAfterDeduction = remainingAmount - deductionAmount;

    // Update the non_working balance
    const updatedNonWorkingBalance = non_working - amount;

    // Update the user's non_working balance in the database
    const updateUserSql = `
      UPDATE users 
      SET non_working = ? 
      WHERE id = ?
    `;

    db.query(updateUserSql, [updatedNonWorkingBalance, user_id], (err, updateResult) => {
      if (err) {
        console.error("Error updating non_working balance:", err);
        return next(new ErrorHandler("Error updating non_working balance", 500));
      }

        const insertWithdrawalSql = `
          INSERT INTO withdrawal_request (user_id, amount, type, deduction) 
          VALUES (?, ?, 'working', ?)
        `;
        db.query(insertWithdrawalSql, [user_id, amountAfterDeduction, deductionAmount], (err, result) => {
          if (err) {
            console.error("Error during withdrawal_request creation:", err);
            return next(new ErrorHandler("Error during withdrawal_request creation!", 500));
          }

          if (result.affectedRows > 0) {
            response.status(200).json({
              success: true,
              message: `Withdrawal request sent successfully. Admin charge of ${deductionAmount} deducted.`,
            });
          } else {
            response.status(400).json({ error: "Withdrawal request could not be sent" });
          }
        });
    });
  });
});

exports.addROIWithdrawalRequest = catchAsyncErrors(async (request, response, next) => {
  try {
    const { user_id, amount } = request.body;
    const { setwithdrawal } = await fetchSetRoiFromAdminSettings();

    if (setwithdrawal !== 1) {
      return response.status(404).json({ message: "Admin has not allowed ROI withdrawals" });
    }

    // Check user's working balance before proceeding
    const selectSql = `SELECT working FROM users WHERE id = ?`;
    db.query(selectSql, [user_id], (err, result) => {
      if (err) {
        console.error("Error fetching user's working balance:", err);
        return next(new ErrorHandler("Error during withdrawal request", 500));
      }

      if (result.length === 0) {
        return response.status(404).json({ error: "User not found" });
      }

      const userWorkingBalance = result[0].working;

      if (userWorkingBalance < amount) {
        return response.status(400).json({ error: "Insufficient balance for withdrawal" });
      }

      // Calculate deduction (5% of the withdrawal amount)
      let deductionAmount = amount * 0.05;
      let amountAfterDeduction = amount - deductionAmount;

      // Update user's working balance
      const updateSql = `UPDATE users SET working = working - ? WHERE id = ?`;
      db.query(updateSql, [amount, user_id], (err, updateResult) => {
        if (err) {
          console.error("Error updating user's working balance:", err);
          return next(new ErrorHandler("Error during withdrawal request", 500));
        }

        if (updateResult.affectedRows === 0) {
          return response.status(400).json({ error: "Failed to update user's working balance" });
        }

        // Insert the withdrawal request after updating the working balance
        const insertSql = `INSERT INTO withdrawal_request (user_id, amount, type, deduction) VALUES (?, ?, ?, ?)`;
        db.query(insertSql, [user_id, amountAfterDeduction, 'ROI', deductionAmount], (err, insertResult) => {
          if (err) {
            console.error("Error inserting withdrawal request:", err);
            return next(new ErrorHandler("Error during withdrawal request creation!", 500));
          }

          if (insertResult.affectedRows > 0) {
            response.status(200).json({
              success: true,
              message: "Withdrawal request sent successfully",
            });
          } else {
            response.status(400).json({ error: "Failed to insert withdrawal request" });
          }
        });
      });
    });
  } catch (error) {
    console.error("Unexpected error in addROIWithdrawalRequest:", error);
    next(error);
  }
});

exports.updateROIWithdrawalRequest = asyncHandler(async (req, res, next) => {
  const { status, amount, user_id ,type} = req.body;
    const { id } = req.params;

    const updateWithdrawalSql = `UPDATE withdrawal_request SET status = ?, acceptat = NOW() WHERE id = ?`;
    db.query(updateWithdrawalSql, [status, id], (err, depositeResult) => {
      if (err) {
        console.error("Error updating user_deposite:", err);
        return next(new ErrorHandler("Error updating user_deposite", 500));
      }

      // Check if update was successful
      if (depositeResult.affectedRows === 0) {
        return next(new ErrorHandler("No user_deposite found or no changes applied", 404));
      }

      // If status is 'complete', update the users table business column
      if (status === 'decline') {
        const updateBusinessSql = `UPDATE users SET working = working + ? WHERE id = ?`;
        db.query(updateBusinessSql, [amount, user_id], (err, userResult) => {
          if (err) {
            console.error("Error updating user's business balance:", err);
            return next(new ErrorHandler("Error updating user's business balance", 500));
          }

          // Check if update was successful
          if (userResult.affectedRows === 0) {
            return next(new ErrorHandler("No user found or no changes applied to business balance", 404));
          }

          // Respond with success message
          res.status(200).json({ success: true, message: "Update successful" });
        });
      } else {
        // If status is not 'complete', respond with success message for deposite update
        res.status(200).json({ success: true, message: "Update successful for withdrawal_request" });
      }
    });
});

exports.debitAmount = asyncHandler(async (req, res, next) => {
  const { id, amount, action, wallet_type } = req.body.updatedData;
  console.log(id, amount, action, wallet_type)
  if(!id || !amount || !action){
    return res.status(400).json({
      success: false,
      error: `Fields required`,
    });
  }
  if (action === "debit" && wallet_type === "active") {
    const checkBalanceSql = `SELECT business, non_working FROM users WHERE id = ?`;
    db.query(checkBalanceSql, [id], (err, results) => {
      if (err) {
        console.error("Error during balance check:", err);
        return next(new ErrorHandler("Error during balance check!", 500));
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const {
        business,non_working
      } = results[0];

      const updateUserSql = `
        UPDATE users 
        SET 
          business =business-?
        WHERE id = ?
      `;

      db.query(
        updateUserSql,
        [
          amount,
          id,
        ],
        (err, updateResult) => {
          if (err) {
            console.error("Error updating user balance columns:", err);
            return next(new ErrorHandler("Error updating user balance columns", 500));
          }

          // Record the transaction
          const transactionSql = `
            INSERT INTO withdrawal_request (user_id, amount,type, status, acceptat) 
            VALUES (?, ?,'working', 'TRN-ADM002', NOW())
          `;

          db.query(transactionSql, [id, amount], (err, result) => {
            if (err) {
              console.error("Error during transaction update:", err);
              return next(new ErrorHandler("Error during transaction update", 500));
            }

            if (result.affectedRows > 0) {
              res.status(200).json({
                success: true,
                message: `${action} successful`,
              });
            } else {
              next(new ErrorHandler(`${action} not found or no changes applied`, 404));
            }
          });
        }
      );
    });
  } 
  
  else if (action === "debit" && wallet_type === "working") {
    const insertSql = `INSERT INTO withdrawal_request (user_id, amount, type, deduction,status,acceptat) VALUES (?, ?, ?, ?,'TRN-ADM002',NOW())`;

    db.query(insertSql, [id, amountAfterDeduction, 'ROI', deductionAmount], (err, result) => {
      if (err) {
        console.error("Error during withdrawal_request insertion:", err);
        return next(new ErrorHandler("Error during withdrawal_request creation!", 500));
      }

      if (result.affectedRows > 0) {
        const updateSql = `UPDATE users SET roi_income = roi_income - ? WHERE id = ?`;
        db.query(updateSql, [amount, id], (err, result) => {
          if (err) {
            console.error("Error during updating ROI income:", err);
            return next(new ErrorHandler("Error during withdrawal_request creation!", 500));
          }

          if (result.affectedRows > 0) {
            res.status(200).json({
              success: true,
              message: `Withdrawal sent successfully`,
            });
          } else {
            console.error("Failed to update user's ROI income");
            res.status(400).json({ error: "Withdrawal could not be sent" });
          }
        });
      } else {
        console.error("Failed to insert into withdrawal_request");
        res.status(400).json({ error: "Withdrawal could not be sent" });
      }
    });
  } else  {
    sql = `UPDATE users SET business = business + ? WHERE id = ?`;
    transactionSql = `INSERT INTO user_deposite (user_id, amount, status,acceptat) VALUES (?, ?, 'TRN-ADM002',NOW())`;
    console.log(amount,id)
  db.query(sql, [amount, id], (err, result) => {
    if (err) {
      console.error("Error during update:", err);
      return next(new ErrorHandler("Error during update", 500));
    }

    if (result?.affectedRows > 0) {
      db.query(transactionSql, [id, amount], (err, result) => {
        if (err) {
          console.error("Error during transaction update:", err);
          return next(new ErrorHandler("Error during transaction update", 500));
        }

        if (result?.affectedRows > 0) {
          res
            .status(200)
            .json({ success: true, message: `${action} successful` });
        } else {
          next(
            new ErrorHandler(`${action} not found or no changes applied`, 404)
          );
        }
      });
    } else {
      next(new ErrorHandler(`${action} not found or no changes applied`, 404));
    }
  });
}
});

