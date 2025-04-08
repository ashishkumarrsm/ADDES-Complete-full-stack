const express = require("express");
const { addBonus, getAllBonuses, claimBonus, getBonus, updateBonus, deleteBonus } = require("../controllers/bonusController");
const router = express.Router();

// Create a new bonus
router.post("/add", addBonus);
router.post("/claim", claimBonus);

// Get all bonuses
router.get("/", getAllBonuses);

// Get a specific bonus by ID
router.get("/:id", getBonus);

// Update a bonus (Admin Only)
router.put("/:id", updateBonus);

// Delete a bonus (Admin Only)
router.delete("/:id", deleteBonus);

module.exports = router;
