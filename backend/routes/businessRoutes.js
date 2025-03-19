const express = require('express');
const router = express.Router();

// Define Uber for Business-related routes here
router.get('/', (req, res) => {
    // Fetch Uber for Business information from the database
    res.json([{ id: 1, message: 'Uber for Business is active!' }]);
});

module.exports = router;
