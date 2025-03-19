const express = require('express');
const router = express.Router();

// Define support-related routes here
router.get('/', (req, res) => {
    // Fetch support information from the database
    res.json([{ id: 1, message: 'How can we help you?' }]);
});

router.post('/', async (req, res) => {
    const { userId, message } = req.body;

    if (!userId || !message) {
        return res.status(400).json({ error: 'User ID and message are required.' });
    }

    try {
        // Assume SupportMessage is a model for storing support messages
        const supportMessage = new SupportMessage({ userId, message });
        await supportMessage.save();
        res.json({ message: 'Support message submitted successfully' });
    } catch (error) {
        console.error('Error submitting support message:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
