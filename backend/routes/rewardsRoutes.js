const express = require('express');
const router = express.Router();

// Define rewards-related routes here
router.get('/', (req, res) => {
    // Fetch rewards from the database
    res.json([{ id: 1, description: '10% off your next ride', points: 100 }]);
});

module.exports = router;
