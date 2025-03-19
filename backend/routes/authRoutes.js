const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const User = require('../models/User');

// Ensure the transporter is configured correctly
const transporter = nodemailer.createTransport({
    service: 'gmail', // Ensure this matches the email provider
    auth: {
        user: process.env.EMAIL_USER, // Ensure this matches the email address
        pass: process.env.EMAIL_PASS, // Ensure this matches the app password
    },
});

// Test the transporter connection
transporter.verify((error, success) => {
    if (error) {
        console.error('Error verifying transporter:', error.message);
    } else {
        console.log('Transporter is ready to send emails');
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        res.status(200).json({ message: 'Login successful', redirect: '/dashboard' });
    } catch (error) {
        console.error('Error logging in user:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Send OTP route
router.post('/send-otp', async (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    try {
        console.log(`Sending OTP to: ${email}`); // Log email for debugging

        // Send OTP email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}`,
        });

        console.log('OTP email sent successfully'); // Log success

        // Save OTP to user's record
        const user = await User.findOneAndUpdate(
            { email },
            { otp },
            { upsert: true, new: true }
        );

        res.status(200).json({ message: 'OTP sent successfully', user });
    } catch (error) {
        console.error('Error sending OTP:', error.message); // Log detailed error
        res.status(500).json({ message: 'Failed to send OTP. Please try again.' });
    }
});

// Verify OTP route
router.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || user.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        // Clear OTP after verification
        user.otp = null;
        await user.save();

        res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
        console.error('Error verifying OTP:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Set password route
router.post('/set-password', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.password = password;
        await user.save();

        res.status(200).json({ message: 'Password set successfully' });
    } catch (error) {
        console.error('Error setting password:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

// Test email route
router.get('/test-email', async (req, res) => {
    console.log('Test email route hit'); // Debugging log
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: 'prashanthktgowda123@gmail.com', // Replace with a valid email address
            subject: 'Test Email',
            text: 'This is a test email from the Uber project.',
        });
        console.log('Test email sent successfully'); // Debugging log
        res.status(200).json({ message: 'Test email sent successfully' });
    } catch (error) {
        console.error('Error sending test email:', error.message);
        res.status(500).json({ message: 'Failed to send test email' });
    }
});

module.exports = router;
