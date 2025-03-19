const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
app.use(bodyParser.json());

console.log('Setting up routes');
// Import routes
const userRoutes = require('./routes/userRoutes');
const driverRoutes = require('./routes/driverRoutes');
const rideRoutes = require('./routes/rideRoutes');
const fareRoutes = require('./routes/fareRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const supportRoutes = require('./routes/supportRoutes');
const emergencyRoutes = require('./routes/emergencyRoutes');
const contactRoutes = require('./routes/contactRoutes');
const idCheckRoutes = require('./routes/idCheckRoutes');
const speedLimitRoutes = require('./routes/speedLimitRoutes');
const eatsIntegrationRoutes = require('./routes/eatsIntegrationRoutes');
const businessRoutes = require('./routes/businessRoutes');
const rewardsRoutes = require('./routes/rewardsRoutes');
const locationRoutes = require('./routes/locationRoutes');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/rides', rideRoutes);
app.use('/api/fares', fareRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/support', supportRoutes);
app.use('/api/emergency', emergencyRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/id-check', idCheckRoutes);
app.use('/api/speed-limit', speedLimitRoutes);
app.use('/api/eats-integration', eatsIntegrationRoutes);
app.use('/api/business', businessRoutes);
app.use('/api/rewards', rewardsRoutes);
app.use('/api/locations', locationRoutes);

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
