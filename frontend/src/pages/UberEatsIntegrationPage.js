import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UberEatsIntegrationPage.css';

function UberEatsIntegrationPage() {
    const [integrationInfo, setIntegrationInfo] = useState([]);

    useEffect(() => {
        // Fetch Uber Eats integration information from the backend
        axios.get('/api/eats-integration')
            .then(response => setIntegrationInfo(response.data))
            .catch(error => console.error('Error fetching Uber Eats integration information:', error));
    }, []);

    return (
        <div className="container">
            <div className="card">
                <h1>Uber Eats Integration Page</h1>
                <ul>
                    {integrationInfo.map(info => (
                        <li key={info.id}>
                            {info.message}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default UberEatsIntegrationPage;
