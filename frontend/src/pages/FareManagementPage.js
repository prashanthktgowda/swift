import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FareManagementPage.css';

function FareManagementPage() {
    const [fares, setFares] = useState([]);

    useEffect(() => {
        // Fetch fares from the backend
        axios.get('/api/fares')
            .then(response => setFares(response.data))
            .catch(error => console.error('Error fetching fares:', error));
    }, []);

    return (
        <div className="container">
            <div className="card">
                <h1>Fare Management Page</h1>
                <ul>
                    {fares.map(fare => (
                        <li key={fare.id}>
                            {fare.type} - {fare.amount}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default FareManagementPage;
