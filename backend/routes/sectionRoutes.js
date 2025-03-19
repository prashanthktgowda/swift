const express = require('express');
const router = express.Router();
const Section = require('../models/Section');

// Get all sections
router.get('/', async (req, res) => {
    try {
        const sections = await Section.find();
        res.json(sections);
    } catch (error) {
        console.error('Error fetching sections:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
