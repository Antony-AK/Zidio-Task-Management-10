const express = require("express");
const Notification = require("../models/Notification");
const router = express.Router();

// Get all notifications
router.get("/notifications", async (req, res) => {
    try {
        const notifications = await Notification.find().sort({ createdAt: -1 });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
