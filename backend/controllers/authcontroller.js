const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/cathAsyncErrorsMiddleware");
const sendToken = require("../utils/jwtToken");
const asyncHandler = require("express-async-handler");
const fetchSetRoiFromAdminSettings = require("../utils/settings");
const sendAdminToken = require("../utils/adminjwtToken");
const { sendMail } = require("../utils/mailer");
const dotenv = require("dotenv");
const db = require("../config/database");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { createTransaction } = require("./transactionController");
dotenv.config({ path: "backend/config/config.env" });

const generateReferralCode = async () => {
  const randomNumber = Math.floor(Math.random() * 999999) + 1; // Generate a random number between 1 and 999999
  const formattedNumber = randomNumber.toString().padStart(6, "0"); // Format number to 6 digits with leading zeros if necessary
  return `TRC${formattedNumber}`;
};

// exports.signup = catchAsyncErrors(async (request, response, next) => {
//   const { phone, email, password, confirmPassword, referralBy, fullname } =
//     request.body;

//   // Check if admin allows registrations
//   const { setregister } = await fetchSetRoiFromAdminSettings();
//   if (setregister !== 1) {
//     return next(new ErrorHandler("Admin not allowing new registration.", 400));
//   }

//   // Generate username (Referral Code)
//   const username = await generateReferralCode();

//   // Validate required fields
//   if (!username || !email || !password || !confirmPassword || !fullname) {
//     return next(new ErrorHandler("All fields are required.", 400));
//   }

//   // Check if passwords match
//   if (password !== confirmPassword) {
//     return next(new ErrorHandler("Passwords do not match.", 400));
//   }

//   try {
//     // Check if user already exists
//     const existingUser = await new Promise((resolve, reject) => {
//       db.query(
//         "SELECT * FROM users WHERE email = ?",
//         [email],
//         (err, results) => {
//           if (err) return reject(err);
//           resolve(results[0]);
//         }
//       );
//     });

//     if (existingUser) {
//       return response
//         .status(400)
//         .json({ error: "User with this email already exists." });
//     }

//     const referralCode = username;

//     // Begin transaction
//     db.beginTransaction(async (transactionErr) => {
//       if (transactionErr) {
//         console.error("Error starting transaction:", transactionErr);
//         return next(new ErrorHandler("Error during signup!", 500));
//       }

//       try {
//         let referringUser;
//         if (referralBy) {
//           try {
//             // Step 1: Check if referring user exists by referral code
//             referringUser = await new Promise((resolve, reject) => {
//               db.query(
//                 "SELECT * FROM users WHERE refferal_code = ?",
//                 [referralBy],
//                 (err, results) => {
//                   if (err) return reject(err);
//                   if (results.length === 0) {
//                     return response
//                       .status(400)
//                       .json({ error: "Invalid referral code." });
//                   }
//                   resolve(results[0]);
//                 }
//               );
//             });

//             // Step 2: Get sponsor bonus amount from bonuses table
//             const bonusAmount = await new Promise((resolve, reject) => {
//               db.query(
//                 `SELECT amount 
//                  FROM bonuses 
//                  WHERE bonus_type = 'sponsor_income' 
//                  ORDER BY created_at DESC 
//                  LIMIT 1`,
//                 (err, results) => {
//                   if (err) return reject(err);
//                   resolve(
//                     results.length > 0 ? parseFloat(results[0].amount) : 0
//                   );
//                 }
//               );
//             });

//             if (bonusAmount > 0) {
//               // Step 3: Credit sponsor income & increment team count
//               await new Promise((resolve, reject) => {
//                 db.query(
//                   `UPDATE users 
//                    SET sponsor_income = sponsor_income + ?
//                    WHERE refferal_code = ?`,
//                   [bonusAmount, referralBy],
//                   (err, results) => {
//                     if (err) return reject(err);
//                     resolve(results);
//                   }
//                 );
//               });

//               // Step 4: Create transaction for the referring user
//               await createTransaction(
//                 referringUser.id, // user_id
//                 bonusAmount, // amount
//                 "credit", // type
//                 "sponsor_income", // description
//                 "completed" // status
//               );
//             }

//             // Step 5: Increment total_team count for the referring user
//             await new Promise((resolve, reject) => {
//               db.query(
//                 "UPDATE users SET total_team = total_team + 1 WHERE id = ?",
//                 [referringUser.id],
//                 (err, results) => {
//                   if (err) return reject(err);
//                   resolve(results);
//                 }
//               );
//             });
//           } catch (error) {
//             console.error("Referral handling error:", error);
//             return response
//               .status(500)
//               .json({ error: "Internal server error." });
//           }
//         }
//         // Insert new user
//         const sql = `
//           INSERT INTO users (username,fullname, phone, email, password, refferal_code ${
//             referralBy ? ", reffer_by" : ""
//           })
//           VALUES (?, ?,?, ?, ?, ? ${referralBy ? ", ?" : ""})
//         `;
//         const values = [
//           username,
//           fullname,
//           phone,
//           email,
//           password,
//           referralCode,
//         ];
//         if (referralBy) values.push(referralBy);

//         const insertResult = await new Promise((resolve, reject) => {
//           db.query(sql, values, (err, result) => {
//             if (err) {
//               if (err.code === "ER_DUP_ENTRY") {
//                 return response
//                   .status(400)
//                   .json({ error: "User with this email already exists." });
//               }
//               return reject(err);
//             }
//             resolve(result);
//           });
//         });

//         if (insertResult.affectedRows > 0) {
//           const userId = insertResult.insertId;

//           // Fetch the newly inserted user's full data
//           const auth = await new Promise((resolve, reject) => {
//             db.query(
//               "SELECT * FROM users WHERE id = ?",
//               [userId],
//               (err, results) => {
//                 if (err) return reject(err);
//                 resolve(results[0]);
//               }
//             );
//           });

//           db.commit((commitErr) => {
//             if (commitErr) {
//               console.error("Error committing transaction:", commitErr);
//               return next(new ErrorHandler("Error during signup!", 500));
//             }

//             sendMail(email, username, password);
//             sendToken(auth, 201, response);
//           });
//         } else {
//           throw new ErrorHandler("User could not be created", 400);
//         }
//       } catch (err) {
//         db.rollback(() => {
//           console.error("Error during signup:", err);
//           return next(
//             err instanceof ErrorHandler
//               ? err
//               : new ErrorHandler("Error during signup!", 500)
//           );
//         });
//       }
//     });
//   } catch (err) {
//     return next(new ErrorHandler("Error checking existing email!", 500));
//   }
// });


exports.signup = catchAsyncErrors(async (request, response, next) => {
  try {
    const { phone, email, password, confirmPassword, referralBy, fullname } = request.body;

    // Validate required fields first (early return for better efficiency)
    if (!email || !password || !confirmPassword || !fullname) {
      return next(new ErrorHandler("All fields are required.", 400));
    }

    // Check if passwords match (early validation)
    if (password !== confirmPassword) {
      return next(new ErrorHandler("Passwords do not match.", 400));
    }

    // Check if admin allows registrations
    const { setregister } = await fetchSetRoiFromAdminSettings();
    if (setregister !== 1) {
      return next(new ErrorHandler("Admin not allowing new registration.", 400));
    }

    // Generate username (Referral Code)
    const referralCode = await generateReferralCode();

    // Execute transaction
    await new Promise((resolve, reject) => {
      db.beginTransaction(async (err) => {
        if (err) {
          return reject(new ErrorHandler("Error starting transaction.", 500));
        }

        try {
          // Check if user already exists (inside transaction for consistency)
          const [existingUsers] = await queryPromise(
            "SELECT id FROM users WHERE email = ? LIMIT 1",
            [email]
          );

          if (existingUsers.length > 0) {
            return reject(new ErrorHandler("User with this email already exists.", 400));
          }

          // Handle referral if provided
          if (referralBy) {
            await processReferral(referralBy, response);
          }

          // Insert new user
          const sql = `
            INSERT INTO users (
              username, fullname, phone, email, password, refferal_code ${referralBy ? ", reffer_by" : ""}
            ) VALUES (
              ?, ?, ?, ?, ?, ? ${referralBy ? ", ?" : ""}
            )
          `;
          
          const values = [
            referralCode, // username is the same as referralCode
            fullname,
            phone,
            email,
            password,
            referralCode,
          ];
          
          if (referralBy) values.push(referralBy);

          const [insertResult] = await queryPromise(sql, values);
          const userId = insertResult.insertId;

          // Fetch the newly inserted user's full data
          const [users] = await queryPromise(
            "SELECT * FROM users WHERE id = ?",
            [userId]
          );
          
          const newUser = users[0];

          // Commit transaction
          db.commit((commitErr) => {
            if (commitErr) {
              return reject(new ErrorHandler("Error finalizing registration.", 500));
            }
            
            // Send confirmation email and token
            sendMail(email, referralCode, password);
            sendToken(newUser, 201, response);
            resolve();
          });
        } catch (error) {
          // Rollback transaction on error
          db.rollback(() => {
            reject(error);
          });
        }
      });
    }).catch((error) => {
      return next(error);
    });
  } catch (error) {
    return next(error instanceof ErrorHandler ? error : new ErrorHandler("Registration failed.", 500));
  }
});

// Helper function for promisified database queries
function queryPromise(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.query(sql, params, (err, results, fields) => {
      if (err) return reject(err);
      resolve([results, fields]);
    });
  });
}

// Helper function to process referrals
async function processReferral(referralBy, response) {
  try {
    // Step 1: Check if referring user exists
    const [referringUsers] = await queryPromise(
      "SELECT * FROM users WHERE refferal_code = ?",
      [referralBy]
    );
    
    if (referringUsers.length === 0) {
      throw new ErrorHandler("Invalid referral code.", 400);
    }
    
    const referringUser = referringUsers[0];

    // Step 2: Get sponsor bonus amount
    const [bonusRows] = await queryPromise(
      `SELECT amount FROM bonuses 
       WHERE bonus_type = 'sponsor_income' 
       ORDER BY created_at DESC LIMIT 1`
    );

    if (bonusRows.length > 0) {
      const bonusAmount = parseFloat(bonusRows[0].amount);
      
      if (bonusAmount > 0) {
        // Step 3: Update referring user's sponsor income
        await queryPromise(
          `UPDATE users SET 
           sponsor_income = sponsor_income + ?,
           total_team = total_team + 1
           WHERE refferal_code = ?`,
          [bonusAmount, referralBy]
        );

        // Step 4: Create transaction record
        await createTransaction(
          referringUser.id,
          bonusAmount,
          "credit",
          "sponsor_income",
          "completed"
        );
      }
    }
  } catch (error) {
    throw error;
  }
}
exports.adminsignin = catchAsyncErrors(async (request, response, next) => {
  const { email, password } = request.body;
 
  const table = "users";
  const sql = `SELECT * FROM ${table} WHERE email=? AND password=? AND role='admin';`;

  db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error("Error during login:", err);
      return next(new ErrorHandler("Error during login!", 400));
    }
    if (result.length > 0) {
      const admin = result[0];

      // Update last_login column with current date and time
      const updateLastLoginSql = `UPDATE ${table} SET last_login = NOW() WHERE id = ?`;
      db.query(updateLastLoginSql, [admin.id], (updateErr) => {
        if (updateErr) {
          console.error("Error updating last login:", updateErr);
          return next(new ErrorHandler("Error updating last login!", 500));
        }

        sendAdminToken(admin, 201, response);
      });
    } else {
      return response
        .status(404)
        .json({ message: "Admin not found with provided credentials" });
    }
  });
});

exports.signin = catchAsyncErrors(async (request, response, next) => {
  const { email, password } = request.body;
 
  const table = "users";
  const sql = `SELECT * FROM ${table} WHERE (email=? OR username=?) AND password=? AND role != 'admin';`;

  const { setlogin } = await fetchSetRoiFromAdminSettings();

  if (setlogin !== 1) {
    return response
      .status(404)
      .json({ message: "Admin not allowed user login" });
  } else {
    db.query(sql, [email, email, password], (err, result) => {
      if (err) {
        console.error("Error during login:", err);
        return next(new ErrorHandler("Error during login!", 500));
      }
      if (result.length > 0) {
       
        const auth = result[0];

        const updateLastLoginSql = `UPDATE ${table} SET last_login = NOW() WHERE id = ?`;
        db.query(updateLastLoginSql, [auth.id], (updateErr) => {
          if (updateErr) {
            console.error("Error updating last login:", updateErr);
            return next(new ErrorHandler("Error updating last login!", 500));
          }

          sendToken(auth, 201, response);
        });
      } else {
        return response
          .status(404)
          .json({ message: "User not found with provided credentials" });
      }
    });
  }
});

exports.signout = catchAsyncErrors(async (request, response, next) => {
  response.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  response.status(200).json({
    success: true,
    message: "Logout successfully !",
  });
});

exports.PasswordChange = catchAsyncErrors(async (request, response, next) => {
  const { email, currentpassword, newpassword } = request.body;
  const sql = `SELECT * FROM users WHERE email=? AND password=?;`;
  db.query(sql, [email, currentpassword], (err, result) => {
    if (err) {
      console.error("Error during login:", err);
      return next(new ErrorHandler("Error during login !", 500));
    }
    if (result.length > 0) {
      const sql2 = `update users set password='${newpassword}' WHERE email='${email}' AND password='${currentpassword}';`;
      db.query(sql2, (err, result) => {
        if (err) {
          console.error("Error during password change:", err);
          return next(new ErrorHandler("Error during password change !", 500));
        } else {
          return response
            .status(400)
            .json({ message: "Password change succesfully" });
        }
      });
    } else {
      return response.status(404).json({ message: "password does'nt match" });
    }
  });
});

exports.signoutadmin = catchAsyncErrors(async (request, response, next) => {
  response.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  response.status(200).json({
    success: true,
    message: "Logout successfully !",
  });
});
