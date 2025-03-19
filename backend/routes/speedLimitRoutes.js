const express = require('express');
const router = express.Router();

// Define speed limit-related routes here
router.get('/', (req, res) => {
    // Fetch speed limit alerts from the database
    res.json([{ id: 1, message: 'You are exceeding the speed limit!' }]);
});

module.exports = router;
