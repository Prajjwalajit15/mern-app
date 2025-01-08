const express = require("express");
const router = express.Router();

router.post('/foodData', (req, res) => {
    try {
        if (!global.food_items || global.food_items.length === 0 || !global.foodCategory || global.foodCategory.length === 0) {
            console.error("Food data or categories not initialized or empty");
            return res.status(404).json({ error: "Food data or categories not available yet" });
        }

        res.status(200).json({ foodItems: global.food_items, foodCategory: global.foodCategory });
        console.log("Food data and categories sent successfully");
    } catch (err) {
        console.error("Error in /foodData route:", err.message);
        res.status(500).json({ error: "Server Error" });
    }
});

module.exports = router;
