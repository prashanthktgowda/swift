const express = require('express');
const router = express.Router();

// Define payment-related routes here
router.get('/methods', (req, res) => {
    // Fetch payment methods from the database
    res.json([{ id: 1, type: 'Credit Card', details: '**** **** **** 1234' }]);
});

router.post('/cash', (req, res) => {
    // Handle cash payment
    res.json({ message: 'Cash payment successful' });
});

router.post('/add', async (req, res) => {
    const { userId, method } = req.body;

    if (!userId || !method) {
        return res.status(400).json({ error: 'User ID and payment method are required.' });
    }

    try {
        // Assume PaymentMethod is a model for storing payment methods
        const paymentMethod = new PaymentMethod({ userId, method });
        await paymentMethod.save();
        res.json({ message: 'Payment method added successfully' });
    } catch (error) {
        console.error('Error adding payment method:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
