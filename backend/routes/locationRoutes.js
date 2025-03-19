const express = require('express');
const axios = require('axios');
const router = express.Router();

// Fetch nearby locations using OpenStreetMap Nominatim API
router.get('/nearby', async (req, res) => {
    const { lat, lon } = req.query; // Latitude and Longitude from query parameters
    console.log('Fetching nearby locations for:', { lat, lon });

    if (!lat || !lon) {
        return res.status(400).json({ error: 'Latitude and longitude are required.' });
    }

    try {
        // Fetch nearby locations using a third-party API or database
        const locations = await fetchNearbyLocations(lat, lon);
        res.json({ locations });
    } catch (error) {
        console.error('Error fetching nearby locations:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Fetch address suggestions with nearby locations using OpenStreetMap Nominatim API
router.get('/autocomplete', async (req, res) => {
    const { query, lat, lon } = req.query; // Address query and user location
    console.log('Fetching address suggestions for:', { query, lat, lon });

    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
        const params = {
            q: query,
            format: 'json',
            addressdetails: 1,
            limit: 10, // Fetch more results to filter later
        };

        if (lat && lon) {
            params.lat = lat;
            params.lon = lon;
        }

        const response = await axios.get('https://nominatim.openstreetmap.org/search', { params });

        // Filter suggestions to prioritize results within the user's city or region
        const suggestions = response.data.map(item => ({
            displayName: item.display_name,
            lat: item.lat,
            lon: item.lon,
        }));

        res.json({ suggestions });
    } catch (error) {
        console.error('Error fetching address suggestions:', error);
        res.status(500).json({ error: 'Failed to fetch address suggestions' });
    }
});

module.exports = router;
