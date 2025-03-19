import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RideSharingPage.css';

function RideSharingPage() {
    const [availableRides, setAvailableRides] = useState([]);

    useEffect(() => {
        // Fetch available rides from the backend
        axios.get('/api/rides/available')
            .then(response => setAvailableRides(response.data))
            .catch(error => console.error('Error fetching available rides:', error));
    }, []);

    const handleJoinRide = (rideId) => {
        // Handle joining a ride
        axios.post(`/api/rides/join/${rideId}`)
            .then(response => console.log('Joined ride:', response.data))
            .catch(error => console.error('Error joining ride:', error));
    };

    return (
        <div className="container">
            <div className="card">
                <h1>Ride Sharing Page</h1>
                <ul>
                    {availableRides.map(ride => (
                        <li key={ride.id}>
                            {ride.date} - {ride.destination}
                            <button className="button" onClick={() => handleJoinRide(ride.id)}>Join Ride</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default RideSharingPage;
