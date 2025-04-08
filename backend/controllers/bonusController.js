const {
  createBonus,
  getBonuses,
  getBonusById,
  updateBonus,
  deleteBonus,
} = require("../services/bonusService");
const { createTransaction } = require("../controllers/transactionController");
const catchAsyncErrors = require("../middlewares/cathAsyncErrorsMiddleware");
const db = require("../config/database");
// Create a new bonus
exports.addBonus = catchAsyncErrors(async (req, res) => {
  const { amount, bonus_type, status } = req.body;

  if (!amount || !bonus_type) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const result = await createBonus(amount, bonus_type, status);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get all bonuses
exports.getAllBonuses = catchAsyncErrors(async (req, res) => {
  try {
    const bonuses = await getBonuses();
    res.status(200).json(bonuses);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get a single bonus by ID
exports.getBonus = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;

  try {
    const bonus = await getBonusById(id);
    if (!bonus) {
      return res.status(404).json({ message: "Bonus not found" });
    }
    res.status(200).json(bonus);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update a bonus (Admin Only)
exports.updateBonus = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;
  const { amount, bonus_type, status } = req.body;

  if (!amount || !bonus_type || !status) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const result = await updateBonus(id, amount, bonus_type, status);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete a bonus (Admin Only)
exports.deleteBonus = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;

  try {
    const result = await deleteBonus(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update user balance and create transaction
exports.claimBonus = catchAsyncErrors(async (req, res) => {
  const { user_id, bonus_type } = req.body;

  if (!user_id || !bonus_type) {
    console.error("Missing user_id or bonus_type in request");
    return res
      .status(400)
      .json({ message: "User ID and Bonus Type are required" });
  }

  try {
    // Step 1: Fetch bonus amount
    const bonusQuery = `
      SELECT amount 
      FROM bonuses 
      WHERE bonus_type = ? AND status = 'approved' 
      ORDER BY created_at DESC 
      LIMIT 1
    `;

    db.query(bonusQuery, [bonus_type], async (err, bonusResult) => {
      if (err) {
        console.error("Error fetching bonus:", err);
        return res
          .status(500)
          .json({ message: "Database error while fetching bonus", error: err });
      }

      if (bonusResult.length === 0) {
        console.warn(`No approved bonus found for type: ${bonus_type}`);
        return res
          .status(404)
          .json({ message: "No approved bonus found for this type" });
      }

      const bonusAmount = parseFloat(bonusResult[0].amount);
      console.log(`Bonus fetched: ${bonusAmount} for type ${bonus_type}`);

      // Step 2: Map bonus_type to column
      let columnToUpdate;
      switch (bonus_type) {
        case "sponsor_income":
          columnToUpdate = "sponsor_income";
          break;
        case "add_income":
          columnToUpdate = "add_income";
          break;
        case "telegram_income":
          columnToUpdate = "telegram_income";
          break;
        case "roi_income":
          columnToUpdate = "roi_income";
          break;
        default:
          console.error("Invalid bonus type:", bonus_type);
          return res.status(400).json({ message: "Invalid bonus type" });
      }

      // Step 3: Update user's bonus column
      const updateUserQuery = `
        UPDATE users 
        SET ${columnToUpdate} = ${columnToUpdate} + ? , wallet = wallet + ?
        WHERE id = ?
      `;
      db.query(
        updateUserQuery,
        [bonusAmount, bonusAmount, user_id],
        async (err, updateResult) => {
          if (err) {
            console.error("Error updating user bonus column:", err);
            return res.status(500).json({
              message: "Database error while updating user",
              error: err,
            });
          }

          if (updateResult.affectedRows === 0) {
            console.warn("User not found with id:", user_id);
            return res.status(404).json({ message: "User not found" });
          }

          console.log(
            `Updated ${columnToUpdate} for user ${user_id} by ${bonusAmount}`
          );

          // Step 4: Create transaction
          try {
            const transaction = await createTransaction(
              user_id,
              bonusAmount,
              "credit",
              bonus_type,
              "completed"
            );

            console.log("Transaction created:", transaction);

            res.status(200).json({
              message: "Bonus claimed successfully",
              bonus_type,
              bonusAmount,
              transaction,
            });
          } catch (transactionError) {
            console.error("Error creating transaction:", transactionError);
            res
              .status(500)
              .json({ message: "Transaction error", error: transactionError });
          }
        }
      );
    });
  } catch (error) {
    console.error("Unexpected server error:", error);
    res.status(500).json({ message: "Server error", error });
  }
});
