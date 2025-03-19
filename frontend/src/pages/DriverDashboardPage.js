import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DriverDashboardPage.css';

function DriverDashboardPage() {
    const [rides, setRides] = useState([]);

    useEffect(() => {
        // Fetch driver rides from the backend
        axios.get('/api/drivers/rides')
            .then(response => setRides(response.data))
            .catch(error => console.error('Error fetching rides:', error));
    }, []);

    return (
        <div className="container">
            <div className="card">
                <h1>Driver Dashboard Page</h1>
                <ul>
                    {rides.map(ride => (
                        <li key={ride.id}>
                            {ride.date} - {ride.destination}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default DriverDashboardPage;
