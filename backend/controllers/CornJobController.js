const catchAsyncErrors = require("../middlewares/cathAsyncErrorsMiddleware");
const ErrorHandler = require("../utils/errorHandler");
const dotenv = require("dotenv");
const db = require("../config/database");
const fetchSetRoiFromAdminSettings = require("../utils/settings");
dotenv.config({ path: "backend/config/config.env" });

const fetchUsers = async () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT id, plan_id, active_plan, roi_income,roi_percentage, roi_income_day, refferal_code,activation_date,created_at FROM users WHERE is_active = 'active' AND roi_status='open' AND status='unblock';`;
    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error fetching users:", err);
        return reject(new ErrorHandler("Error fetching users!", 500));
      }
      resolve(result);
    });
  });
};

const countReferralUsers = async (
  referralCode,
  activation_date,
  minActivePlan
) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT COUNT(*) as referralCount 
      FROM users 
      WHERE reffer_by = ? 
      AND active_plan >= ? 
      AND DATE(activation_date) > '2025-02-06' 
      AND DATE(created_at) BETWEEN DATE(activation_date) AND DATE_ADD(DATE(activation_date), INTERVAL 7 DAY)
    `;

    db.query(sql, [referralCode, minActivePlan], (err, result) => {
      if (err) {
        console.error(
          `Error counting users with referral code ${referralCode}:`,
          err
        );
        return reject(new ErrorHandler("Error counting referral users!", 500));
      }
      resolve(result[0].referralCount || 0);
    });
  });
};

const adjustROIByReferralCount = async (userId, planDetails) => {
  const fetchUserSql = `SELECT refferal_code,created_at,active_plan,activation_date FROM users WHERE id = ?`;
  const user = await new Promise((resolve, reject) => {
    db.query(fetchUserSql, [userId], (err, result) => {
      if (err) {
        console.error(
          `Error fetching user details for User ID ${userId}:`,
          err
        );
        return reject(new ErrorHandler("Error fetching user details!", 500));
      }
      if (result.length === 0) {
        return reject(new ErrorHandler("User not found!", 404));
      }
      resolve(result[0]);
    });
  });

  const referralCount = await countReferralUsers(
    user.refferal_code,
    user.activation_date,
    user.active_plan
  );
  let roi_percentage = planDetails.ROI_overall;

  if (referralCount == 2 || referralCount == 3) {
    roi_percentage = roi_percentage + 2;
  } else if (referralCount == 3 || referralCount == 4) {
    roi_percentage = roi_percentage + 4;
  } else if (referralCount == 5 || referralCount == 6) {
    roi_percentage = roi_percentage + 6;
  } else if (referralCount == 7 || referralCount == 8) {
    roi_percentage = roi_percentage + 8;
  }

  if (roi_percentage > 12) {
    roi_percentage = roi_percentage = 12;
  }
  // if (referralCount >= 2 && referralCount <= 50) {
  //   const increasePercentage = Math.min(Math.floor(referralCount / 2) * 2, 12); // Increase up to 50% in steps of 2
  //   roi_percentage += increasePercentage;
  // }

  return roi_percentage;
};

const fetchPlanById = async (planId) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT ROI_overall FROM plans WHERE id = ?`;
    db.query(sql, [planId], (err, result) => {
      if (err) {
        console.error(`Error fetching plan details for plan ${planId}:`, err);
        return reject(new ErrorHandler("Error fetching plan details!", 500));
      }
      if (result.length === 0) {
        console.warn(`Plan with ID ${planId} not found`);
        return reject(new ErrorHandler("Plan not found!", 404));
      }
      resolve(result[0]);
    });
  });
};

const updateUserROIIncome = async (userId, roiIncome) => {
  return new Promise((resolve, reject) => {
    const fetchUserSql = `SELECT max_amount, roi_max, active_plan,roi_percentage FROM users WHERE id = ? AND roi_status = 'open'`;
    db.query(fetchUserSql, [userId], (err, userResult) => {
      if (err) {
        console.error(
          `Error fetching user details for User ID ${userId}:`,
          err
        );
        return reject(new Error("Error fetching user details!"));
      }

      if (userResult.length === 0) {
        return resolve(false);
      }

      const { max_amount, active_plan, roi_max } = userResult[0];
      const maxLimit = 2 * active_plan;
      let finalROIIncome = roiIncome;
      if (Number(max_amount) + Number(roiIncome) > Number(maxLimit)) {
        finalROIIncome = maxLimit - max_amount;
      }
      console.log(finalROIIncome);
      const sql = `
        UPDATE users
        SET
          roi_income = roi_income + ?,
          working = working + ?,
          max_amount = max_amount + ?,
          roi_income_day = ?,
          roi_status = CASE
                        WHEN roi_income + ? >= ? THEN 'close'
                        ELSE roi_status
                      END
        WHERE id = ? AND roi_status = 'open'
      `;
      db.query(
        sql,
        [
          finalROIIncome,
          finalROIIncome,
          finalROIIncome,
          finalROIIncome,
          finalROIIncome,
          maxLimit,
          userId,
        ],
        (err, result) => {
          if (err) {
            console.error(
              `Error updating ROI income for User ID ${userId}:`,
              err
            );
            return reject(new Error("Error updating ROI income!"));
          }
          resolve(result.affectedRows > 0);
        }
      );
    });
  });
};

exports.updateROIIncomeForUsers = catchAsyncErrors(
  async (request, response, next) => {
    try {
      const { setroi } = await fetchSetRoiFromAdminSettings();
      if (setroi !== 1) {
        return response.status(404).json({ message: "Admin not allowed ROI" });
      }

      const users = await fetchUsers();
      for (const user of users) {
        const { id, plan_id, active_plan } = user;

        if (!plan_id) {
          console.log(`User ${id} does not have a valid plan_id`);
          continue;
        }

        let planDetails;
        try {
          planDetails = await fetchPlanById(plan_id);
        } catch (error) {
          console.log(`Plan for user ${id} with plan_id ${plan_id} not found`);
          continue;
        }

        const roi_per = await adjustROIByReferralCount(id, planDetails);
        console.log(roi_per);
        const roiIncome = (active_plan * roi_per) / 3000;
        console.log(roiIncome);
        const isUpdated = await updateUserROIIncome(id, roiIncome.toFixed(2));

        if (isUpdated) {
          const transactionQuery = `INSERT INTO roi_transaction (user_id, type, amount, onamount, percent) VALUES (?, ?, ?, ?, ?)`;
          const transactionData = [
            id,
            "Invest ROI",
            roiIncome,
            active_plan,
            roi_per,
          ];
          await new Promise((resolve, reject) => {
            db.query(transactionQuery, transactionData, (error) => {
              if (error) {
                console.error(
                  `Error inserting transaction for user ${id}:`,
                  error
                );
                return reject(
                  new ErrorHandler("Error inserting transaction!", 500)
                );
              }
              resolve();
            });
          });
        }
      }

      response
        .status(200)
        .json({ message: "ROI incomes updated successfully" });
    } catch (error) {
      console.error("Error updating ROI incomes:", error);
      next(new ErrorHandler("Error updating ROI incomes!", 500));
    }
  }
);
