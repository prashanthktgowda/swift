const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Fetch user profile
router.get('/profile/:userId', async (req, res) => {
    const { userId } = req.params;
    console.log('Fetching user profile for userId:', userId);
    try {
        const user = await User.findById(userId);
        if (user) {
            res.json({ name: user.name, email: user.email, mobile: user.mobile });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Save user settings
router.post('/settings/:userId', async (req, res) => {
    const { userId } = req.params;
    const { setting1, setting2 } = req.body;
    console.log('Saving user settings for userId:', userId, req.body);
    try {
        const user = await User.findById(userId);
        if (user) {
            user.settings = { setting1, setting2 };
            await user.save();
            res.json({ message: 'Settings saved successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error saving user settings:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/settings/:userId', async (req, res) => {
    const { userId } = req.params;
    console.log('Fetching settings for userId:', userId);

    try {
        const user = await User.findById(userId);
        if (user && user.settings) {
            res.json(user.settings);
        } else {
            res.status(404).json({ error: 'Settings not found for user' });
        }
    } catch (error) {
        console.error('Error fetching user settings:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/signup', async (req, res) => {
    const { name, email, password, mobile } = req.body;

    if (!name || !email || !password || !mobile) {
        return res.status(400).json({ error: 'All fields are required to sign up.' });
    }

    try {
        const user = new User({ name, email, password, mobile });
        await user.save();
        res.status(201).json({ message: 'User signed up successfully' });
    } catch (error) {
        console.error('Error signing up user:', error);
        res.status(400).json({ error: 'Error signing up user' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Login request received', req.body);

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required to log in.' });
    }

    try {
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            console.log('User logged in successfully');
            res.status(200).json({ message: 'User logged in successfully', userId: user._id });
        } else {
            console.error('Invalid credentials');
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(400).json({ error: 'Error logging in user' });
    }
});

module.exports = router;
