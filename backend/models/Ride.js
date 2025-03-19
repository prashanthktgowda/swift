const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    pickupLocation: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    currentLocation: {
        type: { lat: Number, lon: Number },
        default: { lat: 0, lon: 0 }
    },
    status: {
        type: String,
        enum: ['Booked', 'Completed', 'Cancelled'],
        default: 'Booked'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Ride = mongoose.model('Ride', rideSchema);

module.exports = Ride;
