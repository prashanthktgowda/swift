const express = require('express');
const router = express.Router();

// Define notification-related routes here
router.get('/', async (req, res) => {
    try {
        // Assume Notification is a model for storing notifications
        const notifications = await Notification.find();
        res.json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
