const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rating: { type: Number, default: 5 },
    vehicle: { type: String, required: true },
    licensePlate: { type: String, required: true }
});

const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;
