import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import './HomePage.css';
import '../styles/ButtonStyles.css'; // Import button styles
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import courierImage from '../images/Courier.png';
import reserveImage from '../images/reserve_clock.png';
import rideImage from '../images/ride.png';
import recentActivityImage from '../images/Airport-Fall.webp';
import earnerImage from '../images/earner-illustra.webp';
import u4bImage from '../images/u4b-square.webp';
import fleetManagementImage from '../images/fleet-management.webp';
import uberAppQR from '../images/Uber-App.webp';
import driverAppQR from '../images/driver-app.webp';

function HomePage() {
    const [pickupLocation, setPickupLocation] = useState('');
    const [dropoffLocation, setDropoffLocation] = useState('');
    const [pickupSuggestions, setPickupSuggestions] = useState([]);
    const [dropoffSuggestions, setDropoffSuggestions] = useState([]);
    const [mapCenter, setMapCenter] = useState([12.9716, 77.5946]); // Default to Bengaluru
    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
        // Get user's current location
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation([latitude, longitude]);
                setMapCenter([latitude, longitude]); // Center map on user's location
            },
            (error) => {
                console.error('Error fetching user location:', error);
            }
        );
    }, []);

    const fetchSuggestions = async (query, setSuggestions) => {
        if (!query) {
            setSuggestions([]);
            return;
        }

        try {
            const params = { query };
            if (userLocation) {
                params.lat = userLocation[0];
                params.lon = userLocation[1];
            }

            const response = await axios.get('/api/locations/autocomplete', { params });
            setSuggestions(response.data.suggestions);
        } catch (error) {
            console.error('Error fetching address suggestions:', error);
        }
    };

    const handleSelectSuggestion = (location, lat, lon, setLocation, setSuggestions) => {
        setLocation(location);
        setSuggestions([]);
        setMapCenter([parseFloat(lat), parseFloat(lon)]);
    };

    return (
        <div className="home-page">
            <div className="hero-section">
                <div className="hero-content">
                    <h1>Go anywhere with Uber</h1>
                    <div className="ride-courier-toggle">
                        <button className="toggle-button active">Ride</button>
                        <button className="toggle-button">Courier</button>
                    </div>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Pickup location"
                            value={pickupLocation}
                            onChange={e => {
                                setPickupLocation(e.target.value);
                                fetchSuggestions(e.target.value, setPickupSuggestions);
                            }}
                        />
                        {pickupSuggestions.length > 0 && (
                            <ul className="suggestions">
                                {pickupSuggestions.map((suggestion, index) => (
                                    <li
                                        key={index}
                                        onClick={() =>
                                            handleSelectSuggestion(
                                                suggestion.displayName,
                                                suggestion.lat,
                                                suggestion.lon,
                                                setPickupLocation,
                                                setPickupSuggestions
                                            )
                                        }
                                    >
                                        {suggestion.displayName}
                                    </li>
                                ))}
                            </ul>
                        )}
                        <input
                            type="text"
                            placeholder="Dropoff location"
                            value={dropoffLocation}
                            onChange={e => {
                                setDropoffLocation(e.target.value);
                                fetchSuggestions(e.target.value, setDropoffSuggestions);
                            }}
                        />
                        {dropoffSuggestions.length > 0 && (
                            <ul className="suggestions">
                                {dropoffSuggestions.map((suggestion, index) => (
                                    <li
                                        key={index}
                                        onClick={() =>
                                            handleSelectSuggestion(
                                                suggestion.displayName,
                                                suggestion.lat,
                                                suggestion.lon,
                                                setDropoffLocation,
                                                setDropoffSuggestions
                                            )
                                        }
                                    >
                                        {suggestion.displayName}
                                    </li>
                                ))}
                            </ul>
                        )}
                        <div className="date-time-group">
                            <input type="date" />
                            <input type="time" />
                        </div>
                        <button className="button">See prices</button>
                    </div>
                    <p>Log in to see your recent activity</p>
                </div>
                <div className="hero-map">
                    <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={mapCenter}>
                            <Popup>Selected Location</Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
            <div className="suggestions-section">
                <h2>Suggestions</h2>
                <div className="suggestions-cards">
                    <div className="suggestion-card">
                        <img src={courierImage} alt="Courier" />
                        <h3>Courier</h3>
                        <p>Uber makes same-day item delivery easier than ever.</p>
                        <button className="button details-button">Details</button>
                    </div>
                    <div className="suggestion-card">
                        <img src={reserveImage} alt="Reserve" />
                        <h3>Reserve</h3>
                        <p>Reserve your ride in advance so you can relax on the day of your trip.</p>
                        <button className="button details-button">Details</button>
                    </div>
                    <div className="suggestion-card">
                        <img src={rideImage} alt="Ride" />
                        <h3>Ride</h3>
                        <p>Go anywhere with Uber. Request a ride, hop in, and go.</p>
                        <button className="button details-button">Details</button>
                    </div>
                </div>
            </div>
            <div className="recent-activity-section">
                <div className="recent-activity-content">
                    <h2>Log in to see your recent activity</h2>
                    <p>View past trips, tailored suggestions, support resources, and more.</p>
                    <button className="button">Log in to your account</button>
                    <p>Don’t have an Uber account? <Link to="/signup">Sign up</Link></p>
                </div>
                <div className="recent-activity-image">
                    <img src={recentActivityImage} alt="Recent Activity" />
                </div>
            </div>
            <div className="earner-section">
                <div className="earner-image">
                    <img src={earnerImage} alt="Earner" />
                </div>
                <div className="earner-content">
                    <h2>Drive when you want, make what you need</h2>
                    <p>Make money on your schedule with deliveries or rides—or both. You can use your own car or choose a rental through Uber.</p>
                    <button className="button">Get started</button>
                    <p>Already have an account? <Link to="/login">Sign in</Link></p>
                </div>
            </div>
            <div className="business-section">
                <div className="business-content">
                    <h2>The Uber you know, reimagined for business</h2>
                    <p>Uber for Business is a platform for managing global rides and meals, and local deliveries, for companies of any size.</p>
                    <div className="cta-buttons">
                        <button className="button primary">Get started</button>
                        <button className="button secondary">Check out our solutions</button>
                    </div>
                </div>
                <div className="business-image">
                    <img src={u4bImage} alt="Uber for Business" />
                </div>
            </div>
            <div className="fleet-management-section">
                <div className="fleet-management-image">
                    <img src={fleetManagementImage} alt="Fleet Management" />
                </div>
                <div className="fleet-management-content">
                    <h2>Make money by renting out your car</h2>
                    <p>Connect with thousands of drivers and earn more per week with Uber’s free fleet management tools.</p>
                    <button className="button">Get started</button>
                </div>
            </div>
            <div className="app-download-section">
                <h2>It's easier in the apps</h2>
                <div className="app-download-cards">
                    <div className="app-download-card">
                        <img src={uberAppQR} alt="Uber App QR Code" />
                        <div>
                            <h3>Download the Uber app</h3>
                            <p>Scan to download</p>
                        </div>
                    </div>
                    <div className="app-download-card">
                        <img src={driverAppQR} alt="Driver App QR Code" />
                        <div>
                            <h3>Download the Driver app</h3>
                            <p>Scan to download</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default HomePage;
