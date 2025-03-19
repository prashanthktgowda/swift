import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmergencyAssistancePage.css';

function EmergencyAssistancePage() {
    const [emergencyInfo, setEmergencyInfo] = useState([]);

    useEffect(() => {
        // Fetch emergency information from the backend
        axios.get('/api/emergency')
            .then(response => setEmergencyInfo(response.data))
            .catch(error => console.error('Error fetching emergency information:', error));
    }, []);

    return (
        <div className="container">
            <div className="card">
                <h1>Emergency Assistance Page</h1>
                <ul>
                    {emergencyInfo.map(info => (
                        <li key={info.id}>
                            {info.message}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default EmergencyAssistancePage;
