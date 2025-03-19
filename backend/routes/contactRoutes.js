const express = require('express');
const router = express.Router();

// Define contact-related routes here
router.get('/', (req, res) => {
    // Fetch trusted contacts from the database
    res.json([{ id: 1, name: 'Jane Doe', phone: '123-456-7890' }]);
});

module.exports = router;
