import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SpeedLimitAlertsPage.css';

function SpeedLimitAlertsPage() {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        // Fetch speed limit alerts from the backend
        axios.get('/api/speed-limit')
            .then(response => setAlerts(response.data))
            .catch(error => console.error('Error fetching speed limit alerts:', error));
    }, []);

    return (
        <div className="container">
            <div className="card">
                <h1>Speed Limit Alerts Page</h1>
                <ul>
                    {alerts.map(alert => (
                        <li key={alert.id}>
                            {alert.message}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SpeedLimitAlertsPage;
