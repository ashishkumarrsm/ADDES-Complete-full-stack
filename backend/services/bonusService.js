const db = require("../config/database");

// Create a new bonus
const createBonus = (amount, bonus_type, status = "pending") => {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO bonuses (amount, bonus_type, status)
            VALUES (?, ?, ?)
        `;
        db.query(query, [amount, bonus_type, status], (err, result) => {
            if (err) {
                return reject({ message: "Database error", error: err });
            }
            resolve({ message: "Bonus added successfully", bonus_id: result.insertId });
        });
    });
};

// Get all bonuses
const getBonuses = () => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM bonuses ORDER BY created_at DESC";
        db.query(query, (err, results) => {
            if (err) {
                return reject({ message: "Database error", error: err });
            }
            resolve(results);
        });
    });
};

// Get a specific bonus by ID
const getBonusById = (id) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM bonuses WHERE id = ?";
        db.query(query, [id], (err, result) => {
            if (err) {
                return reject({ message: "Database error", error: err });
            }
            resolve(result[0]);
        });
    });
};

// Update a bonus (Admin Only)
const updateBonus = (id, amount, bonus_type, status) => {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE bonuses 
            SET amount = ?, bonus_type = ?, status = ?
            WHERE id = ?
        `;
        db.query(query, [amount, bonus_type, status, id], (err, result) => {
            if (err) {
                return reject({ message: "Database error", error: err });
            }
            if (result.affectedRows === 0) {
                return reject({ message: "Bonus not found" });
            }
            resolve({ message: "Bonus updated successfully" });
        });
    });
};

// Delete a bonus (Admin Only)
const deleteBonus = (id) => {
    return new Promise((resolve, reject) => {
        const query = "DELETE FROM bonuses WHERE id = ?";
        db.query(query, [id], (err, result) => {
            if (err) {
                return reject({ message: "Database error", error: err });
            }
            if (result.affectedRows === 0) {
                return reject({ message: "Bonus not found" });
            }
            resolve({ message: "Bonus deleted successfully" });
        });
    });
};

module.exports = { createBonus, getBonuses, getBonusById, updateBonus, deleteBonus };
