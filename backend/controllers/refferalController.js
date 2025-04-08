const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/cathAsyncErrorsMiddleware");
const dotenv = require("dotenv");
const db = require("../config/database");
const asyncHandler = require("express-async-handler");
const fetchSetRoiFromAdminSettings = require("../utils/settings");

dotenv.config({ path: "backend/config/config.env" });

exports.getReferralTree = catchAsyncErrors(async (request, response, next) => {
  const { referral_code } = request.params;

  const fetchReferralTree = async (referralCode) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT id,username,is_active,active_plan,created_at,email,status FROM users WHERE reffer_by = ?`;
      db.query(sql, [referralCode], async (err, result) => {
        if (err) {
          console.error(
            `Error fetching tree for referral code ${referralCode}:`,
            err
          );
          return reject(new ErrorHandler("Error fetching tree!", 500));
        }
        const tree = [];
        for (const user of result) {
          tree.push({ ...user });
        }
        resolve(tree);
      });
    });
  };

  try {
    const referralTree = await fetchReferralTree(referral_code);
    if (referralTree.length > 0) {
      response.status(200).json({ referralTree: referralTree });
    } else {
      response.status(200).json({ referralTree: [] });
    }
  } catch (error) {
    console.error("Error fetching tree:", error);
    next(new ErrorHandler("Error fetching tree!", 500));
  }
});

exports.getFullReferralTree = catchAsyncErrors(
  async (request, response, next) => {
    const { referral_code } = request.params;

    const fetchReferralTree = async (referralCode) => {
      return new Promise((resolve, reject) => {
        const sql = `SELECT id, username, is_active, created_at,active_plan, email, status, refferal_code FROM users WHERE reffer_by = ?`;
        db.query(sql, [referralCode], async (err, result) => {
          if (err) {
            console.error(
              `Error fetching full tree for referral code ${referralCode}:`,
              err
            );
            return reject(new ErrorHandler("Error fetching tree!", 500));
          }
          const tree = [];
          for (const user of result) {
            const userTree = await fetchReferralTree(user.refferal_code);
            tree.push({ ...user, referrals: userTree });
          }
          resolve(tree);
        });
      });
    };

    try {
      const referralTree = await fetchReferralTree(referral_code);
      if (referralTree.length > 0) {
        response.status(200).json({ treeData: referralTree });
      } else {
        response.status(200).json({ treeData: [] });
      }
    } catch (error) {
      console.error("Error fetching full referral tree:", error);
      next(new ErrorHandler("Error fetching tree!", 500));
    }
  }
);

const fetchAllUsers = async () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT id, is_active, roi_income_day,plan_id, refferal_code, reffer_by,level_status FROM users`;
    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error fetching all users:", err);
        return reject(new Error("Error fetching users!"));
      }
      resolve(result);
    });
  });
};

const insertTransaction = async (
  userId,
  userby_id,
  type,
  amount,
  onamount,
  percent
) => {
  return new Promise((resolve, reject) => {
    if (amount === 0) {
      return resolve();
    }
    const transactionQuery = `
            INSERT INTO invest_level_transaction (user_id,userby_id, type, amount, onamount, percent)
            VALUES (?, ?, ?, ?, ?,?)
        `;
    const transactionData = [
      userId,
      userby_id,
      type,
      amount,
      onamount,
      percent,
    ];
    db.query(transactionQuery, transactionData, (error, results) => {
      if (error) {
        console.error(`Error inserting transaction for user ${userId}:`, error);
        return reject(new Error("Error inserting transaction!"));
      }
      resolve(results);
    });
  });
};

const fetchInvestmentPlan = async () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM invest_level`;
    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error fetching investment plan:", err);
        return reject(new Error("Error fetching investment plan!"));
      }
      resolve(result); // Assuming only one row is fetched
    });
  });
};

const calculateCommissionForUser = async (user, investPlan) => {
  if (user.is_active !== "active") {
    return 0; // If the user is inactive, return 0 commission
  }

  let totalCommission = 0;

  // Level percentages for each level (up to level 20)
  const levelPercentages = [
    investPlan.level_1,
    investPlan.level_2,
    investPlan.level_3,
    investPlan.level_4,
    investPlan.level_5
  ];
  const directChildrenCount = user.referrals.filter(
    (ref) => ref.is_active === "active"
  ).length;

  let maxLevel;
  if (directChildrenCount > 9) {
    maxLevel = Math.min(5, 5);
  } else {
    maxLevel = Math.min(directChildrenCount * 1, 5);
  }

  const queue = [];
  let currentLevel = 0;
  queue.push(...user.referrals.map((child) => ({ referral: child, level: 1 })));
  while (queue.length > 0) {
    const { referral, level } = queue.shift();
    if (referral.is_active === "active" && level <= maxLevel) {
      const commission =
        ((referral.level_status == "close" ? 0 : referral.roi_income_day) ||
          0) *
        (levelPercentages[level - 1] / 100);
      totalCommission += commission;

      await insertTransaction(
        user.id,
        referral.id,
        `invest Level ${level}`,
        commission,
        referral.roi_income_day,
        levelPercentages[level - 1]
      );
      if (referral.referrals && level < levelPercentages.length) {
        queue.push(
          ...referral.referrals.map((child) => ({
            referral: child,
            level: level + 1,
          }))
        );
      }
    }
  }
  return totalCommission;
};

// const updateUserCommission = async (userId,plan_id, newCommission) => {
//     return new Promise((resolve, reject) => {
//       if (isNaN(newCommission)) {
//         console.error(`Invalid commission value for user ${userId}:`, newCommission);
//         return reject(new Error("Invalid commission value!"));
//       }

//       // Fetch user details for calculations
//       const fetchUserSql = `SELECT max_amount, active_plan FROM users WHERE id = ? AND status = 'unblock'`;

//       db.query(fetchUserSql, [userId], (err, userResult) => {
//         if (err) {
//           console.error(`Error fetching user details for User ID ${userId}:`, err);
//           return reject(new Error("Error fetching user details!"));
//         }

//         if (userResult.length === 0) {
//           return resolve(null); // No user found or user is blocked
//         }

//         const { max_amount, active_plan } = userResult[0];
//         let max_point
//         if(plan_id ==1){
//             max_point=2
//         }
//         else if(plan_id ==2){
//             max_point=3
//         }
//         else if(plan_id ==3){
//             max_point=4
//         }
//         else if(plan_id ==4){
//             max_point=5
//         }

//         const maxLimit = max_point * active_plan;
//         let finalCommission = newCommission;
//        console.log(max_point, ",,.sd")
//        console.log(active_plan, "HJKH")
//        console.log(maxLimit,"iiiii")
//         // Check if adding the commission exceeds the max limit
//         if (max_amount + newCommission > maxLimit) {
//           finalCommission = maxLimit - max_amount; // Cap the commission to fit within the limit
//         }

//         const sqlUpdate = `
//           UPDATE users
//           SET
//             level_income_day =  ?,
//             max_amount = max_amount + ?,
//             non_working = non_working + ?,
//             level_income = level_income + ?,
//             level_status = CASE
//                             WHEN max_amount + ? >= ? THEN 'close'
//                             ELSE level_status
//                           END
//           WHERE id = ? AND status = 'unblock'
//         `;

//         db.query(
//           sqlUpdate,
//           [
//             finalCommission, // Investment level income
//             finalCommission, // Max amount
//             finalCommission, // Max amount
//             finalCommission, // Investment month
//             finalCommission,
//             maxLimit, // For level status condition
//             userId,
//           ],
//           (err) => {
//             if (err) {
//               console.error(
//                 `Error updating user commission for user ${userId}:`,
//                 err
//               );
//               return reject(new Error("Error updating user commission!"));
//             }
//             resolve();
//           }
//         );
//       });
//     });
//   };

const updateUserCommission = async (userId, plan_id, newCommission) => {
  return new Promise((resolve, reject) => {
    if (isNaN(newCommission)) {
      console.error(
        `Invalid commission value for user ${userId}:`,
        newCommission
      );
      return reject(new Error("Invalid commission value!"));
    }

    // Fetch user details for calculations
    const fetchUserSql = `SELECT max_amount, active_plan FROM users WHERE id = ? AND status = 'unblock'`;

    db.query(fetchUserSql, [userId], (err, userResult) => {
      if (err) {
        console.error(
          `Error fetching user details for User ID ${userId}:`,
          err
        );
        return reject(new Error("Error fetching user details!"));
      }

      if (userResult.length === 0) {
        return resolve(null); // No user found or user is blocked
      }

      const { max_amount, active_plan } = userResult[0];

      let max_point;
      if (plan_id == 1) {
        max_point = 2;
      } else if (plan_id == 2) {
        max_point = 3;
      } else if (plan_id == 3) {
        max_point = 4;
      } else if (plan_id == 4) {
        max_point = 5;
      }

      const maxLimit = max_point * active_plan;
      console.log({
        user: {
          userId,
          max_point,
          active_plan,
          maxLimit,
        },
      });

      // Skip process if any of these values are invalid (null, undefined, or NaN)
      if (
        max_point === undefined ||
        active_plan === undefined ||
        maxLimit === undefined ||
        isNaN(max_point) ||
        isNaN(active_plan) ||
        isNaN(maxLimit)
      ) {
        console.warn(
          `Skipping process for user ${userId} due to invalid values.`
        );
        return resolve(); // Skip further processing
      }

      // Check if adding the commission exceeds the max limit
      let finalCommission = newCommission;
      if (max_amount + newCommission > maxLimit) {
        finalCommission = maxLimit - max_amount; // Cap the commission to fit within the limit
      }

      const sqlUpdate = `
          UPDATE users 
          SET 
            level_income_day =  ?, 
            max_amount = max_amount + ?, 
            non_working = non_working + ?, 
            level_income = level_income + ?,
            level_status = CASE 
                            WHEN max_amount + ? >= ? THEN 'close' 
                            ELSE level_status 
                          END
          WHERE id = ? AND status = 'unblock'
        `;

      db.query(
        sqlUpdate,
        [
          finalCommission, // Investment level income
          finalCommission, // Max amount
          finalCommission, // Non-working income
          finalCommission, // Level income
          finalCommission,
          maxLimit, // For level status condition
          userId,
        ],
        (err) => {
          if (err) {
            console.error(
              `Error updating user commission for user ${userId}:`,
              err
            );
            return reject(new Error("Error updating user commission!"));
          }
          resolve();
        }
      );
    });
  });
};

const calculateCommissionForAllUsers = async (request, response, next) => {
  try {
    const users = await fetchAllUsers();
    const userMap = new Map();
    const Plan = await fetchInvestmentPlan(); // Fetch percentages for 20 levels
    const investPlan = Plan[0];
    const compoundPlan = Plan[1];
    // Initialize referrals array for each user
    users.forEach((user) => {
      user.referrals = [];
      userMap.set(user.refferal_code, user);
    });

    // Build referral tree
    users.forEach((user) => {
      const parent = userMap.get(user.reffer_by);
      if (parent) {
        parent.referrals.push(user); // Attach user to parent
      } else if (user.reffer_by && user.reffer_by.trim() !== "") {
        console.warn(
          `User ${user.id} has an invalid reffer_by code: ${user.reffer_by}`
        );
      }
    });

    // Calculate commissions iteratively
    const queue = [];
    users.forEach((user) => {
      if (!user.reffer_by || user.reffer_by.trim() === "") {
        queue.push(user); // Add top-level users to the queue
      }
    });

    while (queue.length > 0) {
      const user = queue.shift();

      const data = await calculateCommissionForUser(
        user,
        investPlan,
        compoundPlan
      );
      await updateUserCommission(user.id, user.plan_id, data);

      for (const referral of user.referrals) {
        queue.push(referral);
      }
    }
    response
      .status(200)
      .json({
        message: "All commissions calculated and updated successfully.",
      });
  } catch (error) {
    console.error("Error calculating commissions:", error);
  }
};

exports.getDirectReferrals = catchAsyncErrors(async (req, res) => {
  const { user_id } = req.params;
  const { search = "", status, role, page = 1, limit = 10 } = req.query;

  const offset = (page - 1) * limit;

  // Step 1: Get user's ref_code
  const refCodeQuery = `SELECT refferal_code FROM users WHERE id = ?`;
  db.query(refCodeQuery, [user_id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const userRefCode = result[0].refferal_code;

    // Step 2: Build filters
    let filters = [`refferal_code = ?`];
    let values = [userRefCode];

    if (status) {
      filters.push("status = ?");
      values.push(status);
    }

    if (role) {
      filters.push("role = ?");
      values.push(role);
    }

    if (search) {
      filters.push(
        `(fullname LIKE ? OR username LIKE ? OR email LIKE ? OR number LIKE ?)`
      );
      values.push(
        `%${search}%`,
        `%${search}%`,
        `%${search}%`,
        `%${search}%`
      );
    }

    const whereClause = filters.length ? `WHERE ${filters.join(" AND ")}` : "";

    // Step 3: Count total referrals
    const countQuery = `SELECT COUNT(*) AS total FROM users ${whereClause}`;
    db.query(countQuery, values, (countErr, countResult) => {
      if (countErr) {
        return res.status(500).json({ message: "Count error", error: countErr });
      }

      const total = countResult[0].total;

      // Step 4: Fetch paginated referrals
      const dataQuery = `
        SELECT id, fullname, username,status, refferal_code, email, created_at
        FROM users
        ${whereClause}
        ORDER BY created_at DESC
        LIMIT ? OFFSET ?
      `;

      db.query(
        dataQuery,
        [...values, parseInt(limit), parseInt(offset)],
        (dataErr, referrals) => {
          if (dataErr) {
            return res.status(500).json({ message: "Data fetch error", error: dataErr });
          }

          return res.status(200).json({
            total,
            page: parseInt(page),
            limit: parseInt(limit),
            referrals,
          });
        }
      );
    });
  });
});

exports.calculateCommissionForAllUsers = calculateCommissionForAllUsers;
