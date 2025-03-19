const mongoose = require('mongoose');

const fareSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Standard', 'Premium', 'Pool', 'Luxury'],
        required: true
    },
    baseFare: {
        type: Number,
        required: true
    },
    perKmRate: {
        type: Number,
        required: true
    },
    perMinuteRate: {
        type: Number,
        required: true
    },
    surgeMultiplier: {
        type: Number,
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Fare = mongoose.model('Fare', fareSchema);

module.exports = Fare;
