const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/cathAsyncErrorsMiddleware");
const dotenv = require("dotenv");
const db = require("../config/database");

dotenv.config({ path: "backend/config/config.env" });

const threshold = [
  5000, 15000, 40000, 90000, 190000, 390000, 890000, 1890000,
  3390000, 5890000, 10890000, 20890000,
];
const salaryAmount = [0, 0, 0, 100, 250, 500, 1300, 2800, 5300, 9300, 17300, 33300];

const fetchAllUsers = async () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT id, username, is_active, active_plan, refferal_code, reward_level, reffer_by, plan_id, reward FROM users`;
    db.query(sql, (err, result) => {
      if (err) {
        console.error("Error fetching users:", err);
        return reject(new Error("Error fetching users!"));
      }
      resolve(result);
    });
  });
};

// Recursive function to build referral tree
async function buildReferralTree(users) {
  const userMap = new Map();
  const rootNodes = [];

  // Initialize map and referrals array for each user
  users.forEach((user) => {
    user.referrals = [];
    userMap.set(user.refferal_code, user);  // Map users by their referral code
  });

  // Build the tree by linking users to their referrers
  users.forEach((user) => {
    const parent = userMap.get(user.reffer_by);  // Get the parent user using the reffer_by code
    if (parent) {
      parent.referrals.push(user);  // Add current user as referral to parent
    }
  });

  // Find root nodes (users with no referrer)
  users.forEach((user) => {
    if (user.referrals.length > 0 && !userMap.has(user.reffer_by)) {
      rootNodes.push(user);
    }
  });

  // Add users that have referrals but aren't already in root nodes (to avoid missing any users)
  users.forEach((user) => {
    if (user.referrals.length > 0 && !rootNodes.includes(user)) {
      rootNodes.push(user);
    }
  });

  // Recursively fetch all referrals (children, grandchildren, etc.)
  const fetchReferralTree = async (user) => {
    const sql = `SELECT id, username, is_active, created_at, active_plan, email, status, refferal_code FROM users WHERE reffer_by = ?`;
    return new Promise((resolve, reject) => {
      db.query(sql, [user.refferal_code], async (err, result) => {
        if (err) {
          console.error(`Error fetching referrals for ${user.username}:`, err);
          return reject(new ErrorHandler("Error fetching referrals!", 500));
        }

        const referrals = [];
        for (const refUser of result) {
          const childTree = await fetchReferralTree(refUser);  // Recursively fetch referrals of each referral
          referrals.push({ ...refUser, referrals: childTree });  // Add child referrals to the user
        }
        resolve(referrals);
      });
    });
  };

  // Build the full referral tree recursively for each root user
  const buildFullTree = async (user) => {
    try {
      user.referrals = await fetchReferralTree(user);  // Fetch and attach the entire referral tree for the user
    } catch (error) {
      console.error("Error building full tree:", error);
    }
  };

  // For each root node, build the full referral tree
  const rootPromises = rootNodes.map(async (user) => {
    await buildFullTree(user);  // Build tree for each root user
  });

  // Wait for all trees to be fully built before finishing
  return Promise.all(rootPromises).then(() => rootNodes);  // Return root nodes with complete referral trees
}

const calculateTeamBusiness = (user) => {
  let totalBusiness = user.active_plan || 0;  // Start with the user's active plan

  // Add business from all referrals recursively
  if (user.referrals && user.referrals.length > 0) {
    user.referrals.forEach((referral) => {
      totalBusiness += calculateTeamBusiness(referral);
    });
  }

  return totalBusiness;
};

const calculateBusinessForLegs = (users) => {
  const result = {};
  users.forEach((user) => {
    result[user.id] = calculateTeamBusiness(user);  // Calculate total business for the user's team (leg)
  });
  return result;
};

const updateSalaryForUser = async (userId, salaryLevel, salaryAmount, startDate) => {
  return new Promise((resolve, reject) => {
    const fetchUserSql = `SELECT total_salary, month_salary, month_duration, salary_start, salary_level 
                          FROM users WHERE id = ? AND status = 'unblock'`;

    db.query(fetchUserSql, [userId], (err, userResult) => {
      if (err) {
        console.error(`Error fetching user details for User ID ${userId}:`, err);
        return reject(new Error("Error fetching user details!"));
      }

      if (userResult.length === 0) {
        return resolve(null); // No user found or user is blocked
      }

      const user = userResult[0];
      const { total_salary, salary_level, month_duration, salary_start } = user;

      const salaryStartDate = new Date(salary_start);
      const currentDate = new Date();

      if (
        salary_level === salaryLevel &&
        month_duration < 10 &&
        currentDate >= salaryStartDate
      ) {
        const updatedMonthSalary = salaryAmount;
        const updatedTotalSalary = total_salary + salaryAmount;
        const updatedMonthDuration = month_duration + 1;

        const updateSalarySql = `
          UPDATE users 
          SET 
            total_salary = ?, 
            month_salary = ?, 
            non_working = non_working+ ?, 
            month_duration = ?
          WHERE id = ? AND status = 'unblock'
        `;

        db.query(
          updateSalarySql,
          [updatedTotalSalary, updatedMonthSalary,updatedMonthSalary, updatedMonthDuration, userId],
          (err, result) => {
            if (err) {
              console.error(`Error updating salary for User ID ${userId}:`, err);
              return reject(new Error("Error updating salary!"));
            }
            const sqlInsert = `INSERT INTO salary_transaction (user_id, amount,type) VALUES (?, ?,?)`;
        db.query(sqlInsert, [userId, salaryAmount,'salary'], (err) => {
          if (err) {
            console.error(
              `Error logging reward transaction for User ID ${userId}:`,
              err
            );
            return reject(new Error("Error logging reward transaction!"));
          }
          resolve(result);
        });
          }
        );
      } else if (salary_level < salaryLevel) {
        const updatedTotalSalary = total_salary + salaryAmount;
        const updatedMonthSalary = salaryAmount;
        const updatedMonthDuration = 1;

        const updateSalarySql = `
          UPDATE users 
          SET 
            total_salary = ?, 
            month_salary = ?, 
            non_working = non_working+ ?, 
            month_duration = ?, 
            salary_level = ?, 
            salary_start = ?
          WHERE id = ? AND status = 'unblock'
        `;

        db.query(
          updateSalarySql,
          [
            updatedTotalSalary,
            updatedMonthSalary,
            updatedMonthSalary,
            updatedMonthDuration,
            salaryLevel,
            startDate,
            userId,
          ],
          (err, result) => {
            if (err) {
              console.error(`Error starting new salary level for User ID ${userId}:`, err);
              return reject(new Error("Error updating salary for new level!"));
            }
            const sqlInsert = `INSERT INTO salary_transaction (user_id, amount,type) VALUES (?, ?,?)`;
        db.query(sqlInsert, [userId, salaryAmount,'salary'], (err) => {
          if (err) {
            console.error(
              `Error logging reward transaction for User ID ${userId}:`,
              err
            );
            return reject(new Error("Error logging reward transaction!"));
          }
          resolve(result);
        });
          }
        );
      } else {
        resolve(null); // No update needed
      }
    });
  });
};

const calculateSalariesForAllUsers = async (users) => {
  for (const user of users) {
    const userSalaryLevel = user.salary_level;
    const userMonthDuration = user.month_duration;

    // Calculate business by legs (recursively calculate the team business)
    const businessByLeg = calculateBusinessForLegs(user.referrals || []);
    const sortedLegs = Object.entries(businessByLeg)
      .map(([legId, totalBusiness]) => ({
        legId: parseInt(legId),
        totalBusiness,
      }))
      .sort((a, b) => b.totalBusiness - a.totalBusiness); // Sort by total business in descending order

    // Get the top 2 legs or fewer if there aren't enough legs
    const firstLeg = sortedLegs[0] || { totalBusiness: 0 };
    const secondLeg = sortedLegs[1] || { totalBusiness: 0 };

    // For third leg, sum all remaining legs after the top two
    const thirdLeg = sortedLegs.slice(2).reduce((sum, { totalBusiness }) => sum + totalBusiness, 0);

    // Calculate total business
    const totalBusiness = firstLeg.totalBusiness + secondLeg.totalBusiness + thirdLeg;

    let salaryLevel = -1;
    let monthlySalary = 0;

    // Check thresholds for salary levels
    for (let i = 0; i < threshold.length; i++) {
      const thresholdAmount = threshold[i];

      if (totalBusiness >= thresholdAmount) {
        const required40 = (thresholdAmount * 40) / 100;
        const required30A = (thresholdAmount * 30) / 100;
        const required30B = (thresholdAmount * 30) / 100;

        // Check if the top two legs and the third leg meet the required thresholds
        if (
          firstLeg.totalBusiness >= required40 &&
          secondLeg.totalBusiness >= required30A &&
          thirdLeg >= required30B
        ) {
          salaryLevel = i;
          monthlySalary = salaryAmount[i];
        }
      } else {
        break;
      }
    }

    if (salaryLevel >= 0) {
      const startDate = new Date().toISOString().split("T")[0]; // Set start date as today's date
      await updateSalaryForUser(
        user.id,
        salaryLevel + 1, // Salary level is 1-based, so add 1
        monthlySalary,
        startDate
      );
    }
  }
};


exports.salary = catchAsyncErrors(async () => {
  try {
    const users = await fetchAllUsers();
    const referralTree =await buildReferralTree(users);
    await calculateSalariesForAllUsers(referralTree);
    // res.json({ message: "Salaries calculated and updated successfully." });
  } catch (error) {
    console.error("Error in salary calculation:", error);
    // res.status(500).json({ message: "Internal Server Error" });
  }
});
