import React, { useState } from 'react';
import axios from 'axios';
import MapComponent from '../components/MapComponent';
import './ScheduleRidesPage.css';

function ScheduleRidesPage() {
    const [pickupLocation, setPickupLocation] = useState('');
    const [destination, setDestination] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const userId = localStorage.getItem('userId'); // Assume userId is stored in localStorage after login

    const handleScheduleRide = () => {
        if (!pickupLocation || !destination || !date || !time) {
            alert('Please fill in all fields.');
            return;
        }
        // Handle scheduling a ride
        axios.post('/api/rides/schedule', { userId, pickupLocation, destination, date, time })
            .then(response => alert('Ride scheduled successfully!'))
            .catch(error => alert('Error scheduling ride.'));
    };

    const markers = [
        { position: [12.9716, 77.5946], popup: 'Pickup Location' }, // Example marker for Bangalore
        { position: [12.2958, 76.6394], popup: 'Destination' }, // Example marker for Mysore
    ];

    return (
        <div className="container">
            <div className="card">
                <h1>Schedule Rides Page</h1>
                <MapComponent center={[12.9716, 77.5946]} markers={markers} />
                <input
                    type="text"
                    placeholder="Pickup Location"
                    value={pickupLocation}
                    onChange={e => setPickupLocation(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Destination"
                    value={destination}
                    onChange={e => setDestination(e.target.value)}
                />
                <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                />
                <input
                    type="time"
                    value={time}
                    onChange={e => setTime(e.target.value)}
                />
                <button className="button" onClick={handleScheduleRide}>Schedule Ride</button>
            </div>
        </div>
    );
}

export default ScheduleRidesPage;
