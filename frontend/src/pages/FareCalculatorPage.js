import React, { useState } from 'react';
import axios from 'axios';
import './FareCalculatorPage.css';

function FareCalculatorPage() {
    const [pickupLocation, setPickupLocation] = useState('');
    const [destination, setDestination] = useState('');
    const [fare, setFare] = useState(null);

    const handleCalculateFare = () => {
        // Handle fare calculation
        axios.post('/api/fares/calculate', { pickupLocation, destination })
            .then(response => setFare(response.data.fare))
            .catch(error => console.error('Error calculating fare:', error));
    };

    return (
        <div className="container">
            <div className="card">
                <h1>Fare Calculator Page</h1>
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
                <button className="button" onClick={handleCalculateFare}>Calculate Fare</button>
                {fare && <p>Estimated Fare: ${fare}</p>}
            </div>
        </div>
    );
}

export default FareCalculatorPage;
