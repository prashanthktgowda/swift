const express = require('express');
const router = express.Router();
const Ride = require('../models/Ride'); // Assume Ride model is created

// Fetch ride history
router.get('/history/:userId', async (req, res) => {
    const { userId } = req.params;
    console.log('Fetching ride history for userId:', userId);
    try {
        const rides = await Ride.find({ userId });
        res.json(rides);
    } catch (error) {
        console.error('Error fetching ride history:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Book a ride
router.post('/book', async (req, res) => {
    const { userId, pickupLocation, destination, rideType } = req.body;

    if (!userId || !pickupLocation || !destination || !rideType) {
        return res.status(400).json({ error: 'All fields are required to book a ride.' });
    }

    try {
        const ride = new Ride({ userId, pickupLocation, destination, rideType, status: 'Booked' });
        await ride.save();
        res.json({ message: 'Ride booked successfully', rideId: ride._id });
    } catch (error) {
        console.error('Error booking ride:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Schedule a ride
router.post('/schedule', async (req, res) => {
    const { userId, pickupLocation, destination, date, time } = req.body;
    console.log('Scheduling ride:', req.body);

    if (!userId || !pickupLocation || !destination || !date || !time) {
        return res.status(400).json({ error: 'All fields are required to schedule a ride.' });
    }

    try {
        const ride = new Ride({
            userId,
            pickupLocation,
            destination,
            status: 'Scheduled',
            createdAt: new Date(`${date}T${time}`)
        });
        await ride.save();
        res.json({ message: 'Ride scheduled successfully', rideId: ride._id });
    } catch (error) {
        console.error('Error scheduling ride:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/available', (req, res) => {
    // Fetch available rides for ride sharing
    res.json([{ id: 1, date: '2023-10-01', destination: 'Location A' }]);
});

router.post('/join/:rideId', async (req, res) => {
    const { rideId } = req.params;
    const { userId } = req.body; // Ensure userId is passed in the request body
    console.log('Joining ride:', { rideId, userId });

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required to join a ride.' });
    }

    try {
        const ride = await Ride.findById(rideId);
        if (!ride) {
            return res.status(404).json({ error: 'Ride not found' });
        }

        // Add user to the ride's participants (assuming a participants array exists)
        if (!ride.participants) {
            ride.participants = [];
        }
        ride.participants.push(userId);
        await ride.save();

        res.json({ message: 'Joined ride successfully', ride });
    } catch (error) {
        console.error('Error joining ride:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/pool', (req, res) => {
    // Fetch available pool rides
    res.json([{ id: 1, date: '2023-10-01', destination: 'Location A' }]);
});

router.post('/pool/join/:rideId', (req, res) => {
    // Join a pool ride
    res.json({ message: 'Joined pool ride' });
});

// Handle multiple destinations
router.post('/multiple-destinations', async (req, res) => {
    const { userId, destinations } = req.body;
    console.log('Handling multiple destinations:', req.body);
    try {
        const ride = new Ride({
            userId,
            pickupLocation: destinations[0],
            destination: destinations[destinations.length - 1],
            status: 'Booked',
            createdAt: new Date()
        });
        await ride.save();
        res.json({ message: 'Multiple destinations handled successfully', rideId: ride._id });
    } catch (error) {
        console.error('Error handling multiple destinations:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/update-location/:rideId', async (req, res) => {
    const { rideId } = req.params;
    const { lat, lon } = req.body;

    if (!lat || !lon) {
        return res.status(400).json({ error: 'Latitude and longitude are required to update location.' });
    }

    try {
        const ride = await Ride.findById(rideId);
        if (ride) {
            ride.currentLocation = { lat, lon };
            await ride.save();
            res.json({ message: 'Location updated successfully' });
        } else {
            res.status(404).json({ error: 'Ride not found' });
        }
    } catch (error) {
        console.error('Error updating location:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:rideId/location', async (req, res) => {
    const { rideId } = req.params;
    console.log('Fetching location for rideId:', rideId);

    try {
        const ride = await Ride.findById(rideId);
        if (ride && ride.currentLocation) {
            res.json({ location: ride.currentLocation });
        } else {
            res.status(404).json({ error: 'Ride location not found' });
        }
    } catch (error) {
        console.error('Error fetching ride location:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
