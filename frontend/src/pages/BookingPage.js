import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapComponent from '../components/MapComponent';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import AddressInput from '../components/AddressInput';
import './BookingPage.css';

function BookingPage() {
    const [pickupLocation, setPickupLocation] = useState('');
    const [destination, setDestination] = useState('');
    const [rideType, setRideType] = useState(''); // Added ride type state
    const [nearbyLocations, setNearbyLocations] = useState([]);
    const [pickupSuggestions, setPickupSuggestions] = useState([]);
    const [destinationSuggestions, setDestinationSuggestions] = useState([]);
    const [message, setMessage] = useState('');
    const [rideLocation, setRideLocation] = useState(null);
    const userId = localStorage.getItem('userId'); // Assume userId is stored in localStorage after login

    useEffect(() => {
        // Get user's current location
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                console.log('User location:', { latitude, longitude });

                // Fetch nearby locations from the backend
                try {
                    const response = await axios.get('/api/locations/nearby', {
                        params: { lat: latitude, lon: longitude },
                    });
                    setNearbyLocations(response.data.nearbyLocations);
                } catch (error) {
                    console.error('Error fetching nearby locations:', error);
                }
            },
            (error) => {
                console.error('Error getting user location:', error);
            }
        );
    }, []);

    const fetchSuggestions = async (query, setSuggestions) => {
        if (!query) {
            setSuggestions([]);
            return;
        }

        try {
            const response = await axios.get('/api/locations/autocomplete', {
                params: { query },
            });
            setSuggestions(response.data.suggestions);
        } catch (error) {
            console.error('Error fetching address suggestions:', error);
        }
    };

    const handleSelectSuggestion = (location, setLocation, setSuggestions) => {
        setLocation(location);
        setSuggestions([]);
    };

    const handleBookRide = () => {
        if (!pickupLocation || !destination || !rideType) {
            setMessage('Please fill in all fields, including ride type.');
            return;
        }
        // Handle booking a ride
        axios.post('/api/rides/book', { userId, pickupLocation, destination, rideType })
            .then(response => {
                setMessage('Ride booked successfully!');
                const rideId = response.data.rideId;

                // Start fetching real-time ride location
                const intervalId = setInterval(async () => {
                    try {
                        const rideResponse = await axios.get(`/api/rides/${rideId}/location`);
                        setRideLocation(rideResponse.data.location);
                    } catch (error) {
                        console.error('Error fetching ride location:', error);
                        clearInterval(intervalId);
                    }
                }, 5000); // Fetch location every 5 seconds
            })
            .catch(error => {
                console.error('Error booking ride:', error);
                setMessage('Error booking ride. Please try again.');
            });
    };

    const handleSelectLocation = (location) => {
        if (!pickupLocation) {
            setPickupLocation(location);
        } else {
            setDestination(location);
        }
    };

    const markers = [
        { position: [12.9716, 77.5946], popup: 'Pickup Location' }, // Example marker for Bangalore
        { position: [12.2958, 76.6394], popup: 'Destination' }, // Example marker for Mysore
    ];

    if (rideLocation) {
        markers.push({ position: [rideLocation.lat, rideLocation.lon], popup: 'Ride Location' });
    }

    return (
        <div className="booking-page">
            <NavBar />
            <div className="booking-header">
                <h1>Request a Ride</h1>
                <p>Enter your pickup and destination locations to get started.</p>
            </div>
            <div className="booking-content">
                <div className="map-container">
                    <MapComponent center={[12.9716, 77.5946]} markers={markers} />
                </div>
                <div className="form-container">
                    <div className="input-group">
                        <label>Pickup Location</label>
                        <AddressInput onSelectAddress={setPickupLocation} />
                    </div>
                    <div className="input-group">
                        <label>Destination</label>
                        <AddressInput onSelectAddress={setDestination} />
                    </div>
                    <button className="button" onClick={handleBookRide}>Request Ride</button>
                    {message && <p className="message">{message}</p>}
                </div>
            </div>
            <div className="nearby-locations-container">
                <h2>Nearby Locations</h2>
                <ul className="nearby-locations">
                    {Object.entries(nearbyLocations).map(([key, value]) => (
                        <li key={key} onClick={() => handleSelectLocation(value)}>
                            {key}: {value}
                        </li>
                    ))}
                </ul>
            </div>
            <Footer />
        </div>
    );
}

export default BookingPage;
