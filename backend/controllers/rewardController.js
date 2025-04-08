const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/cathAsyncErrorsMiddleware");
const dotenv = require("dotenv");
const db = require("../config/database");
dotenv.config({ path: "backend/config/config.env" });

const thresholds = [
  2500, 15000, 40000, 90000, 190000, 390000, 890000, 1890000,
  3390000, 5890000, 10890000, 20890000,
];
const rewardValues = [
  100, 350, 850, 1850, 3850, 7850, 17850, 37850, 67850, 117850, 217850, 417850, 
];



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
function buildReferralTree(users) {
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

const updateRewardForUser = async (
  userId,
  reward,
  reward_level,
  user_reward_level,
) => {
 
  return new Promise((resolve, reject) => {
    // Fetch user details to perform the necessary calculations
    const fetchUserSql = `SELECT max_amount, active_plan FROM users WHERE id = ? AND status = 'unblock'`;
 
    db.query(fetchUserSql, [userId], (err, userResult) => {
      if (err) {
        console.error(`Error fetching user details for User ID ${userId}:`, err);
        return reject(new Error("Error fetching user details!"));
      }
 
      if (userResult.length === 0) {
        return resolve(null); // No user found or user is blocked
      }
 
      let sql;
      if (user_reward_level < reward_level) {
        sql = `
          UPDATE users
          SET
            reward = reward + ${reward},non_working=non_working + ${reward}, reward_level = ${reward_level}, max_amount =max_amount+ ${reward_level} WHERE id = ${userId} AND status = 'unblock'
        `;
      } else if (user_reward_level == reward_level) {
        return resolve(null); // No update needed if levels are equal
      }
 
      db.query(sql, (err, result) => {
        if (err) {
          console.error(`Error updating user reward for User ID ${userId}:`, err);
          return reject(new Error("Error updating user reward!"));
        }
 
        const sqlInsert = `INSERT INTO reward_transaction (user_id, amount) VALUES (?, ?)`;
        db.query(sqlInsert, [userId, reward], (err) => {
          if (err) {
            console.error(
              `Error logging reward transaction for User ID ${userId}:`,
              err
            );
            return reject(new Error("Error logging reward transaction!"));
          }
          resolve(result);
        });
      });
    });
  });
};

const calculateRewardsForAllUsers = async (users) => {
  for (const user of users) {
    const user_reward_level = user.reward_level;
    const user_reward_remaining_months = user.reward_remaining_months;

    // Calculate business by legs (recursively calculate the team business)
    const businessByLeg = calculateBusinessForLegs(user.referrals || []);
    const sortedLegs = Object.entries(businessByLeg)
      .map(([legId, totalBusiness]) => ({
        legId: parseInt(legId),
        totalBusiness,
      }))
      .sort((a, b) => b.totalBusiness - a.totalBusiness);  // Sort by business, descending

    // Get the top 2 legs or fewer if there aren't enough legs
    const firstLeg = sortedLegs[0] || { totalBusiness: 0 };  // Default to 0 if undefined
    const secondLeg = sortedLegs[1] || { totalBusiness: 0 };  // Default to 0 if undefined

    // For third leg, sum all remaining legs after the top two
    const thirdLeg = sortedLegs.slice(2).reduce((sum, { totalBusiness }) => sum + totalBusiness, 0);

    const totalBusiness = firstLeg.totalBusiness + secondLeg.totalBusiness + thirdLeg;

    let reward_level = -1;
    let reward = 0;
    let P_reward = 0;
    let newreward = 0;

    // Check thresholds for reward levels
    for (let i = 0; i < thresholds.length; i++) {
      const thresholdAmount = thresholds[i];

      if (totalBusiness >= thresholdAmount) {
        const required40 = (thresholdAmount * 40) / 100;
        const required30A = (thresholdAmount * 30) / 100;
        const required30B = (thresholdAmount * 30) / 100;

        console.log(firstLeg,secondLeg,thirdLeg,user.id)
        // Check if the legs satisfy the required threshold percentages
        if (
          firstLeg.totalBusiness >= required40 &&
          secondLeg.totalBusiness >= required30A &&
          thirdLeg >= required30B
        ) {
          reward_level = i;
          if (i == 0) {
            P_reward = 30;
          } else {
            P_reward = rewardValues[i - 1];
          }
          reward = rewardValues[i];
        }
      } else {
        break;
      }
    }

    if (reward_level >= 0) {
      if (
        user_reward_level == reward_level + 1 &&
        user_reward_remaining_months == 0
      ) {
        console.log("User reward level is not satisfying the condition.");
      } else {
        if (user_reward_level !== 0) {
          newreward = reward - rewardValues[user_reward_level - 1];
        } else {
          newreward = reward;
        }
        await updateRewardForUser(
          user.id,
          newreward,
          reward_level + 1,
          user_reward_level,
        );
      }
    }
  }
};


exports.reward = catchAsyncErrors(async (req, res, next) => {
  try {
    const users = await fetchAllUsers();
    const referralTree = await buildReferralTree(users);  // Wait for the full tree to be built
    await calculateRewardsForAllUsers(referralTree);
    // res.json({ referralTree: referralTree });
    res.status(200).json({
      status: 'success',
      message: 'Reward calculation completed successfully',
      referralTree : referralTree
    })
  } catch (error) {
    console.error("Error in reward calculation:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
