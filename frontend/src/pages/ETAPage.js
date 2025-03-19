 import React, { useState } from 'react';
import axios from 'axios';
import './ETAPage.css';

function ETAPage() {
    const [pickupLocation, setPickupLocation] = useState('');
    const [destination, setDestination] = useState('');
    const [eta, setEta] = useState(null);

    const handleCalculateETA = () => {
        // Handle ETA calculation
        axios.post('/api/eta/calculate', { pickupLocation, destination })
            .then(response => setEta(response.data.eta))
            .catch(error => console.error('Error calculating ETA:', error));
    };

    return (
        <div className="container">
            <div className="card">
                <h1>ETA Page</h1>
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
                <button className="button" onClick={handleCalculateETA}>Calculate ETA</button>
                {eta && <p>Estimated Time of Arrival: {eta} minutes</p>}
            </div>
        </div>
    );
}

export default ETAPage;
