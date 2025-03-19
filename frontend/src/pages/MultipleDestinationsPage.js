import React, { useState } from 'react';
import axios from 'axios';
import './MultipleDestinationsPage.css';

function MultipleDestinationsPage() {
    const [destinations, setDestinations] = useState(['']);
    
    const handleAddDestination = () => {
        setDestinations([...destinations, '']);
    };

    const handleDestinationChange = (index, value) => {
        const newDestinations = [...destinations];
        newDestinations[index] = value;
        setDestinations(newDestinations);
    };

    const handleSubmit = () => {
        // Handle submitting multiple destinations
        axios.post('/api/rides/multiple-destinations', { destinations })
            .then(response => console.log('Multiple destinations submitted:', response.data))
            .catch(error => console.error('Error submitting multiple destinations:', error));
    };

    return (
        <div className="container">
            <div className="card">
                <h1>Multiple Destinations Page</h1>
                {destinations.map((destination, index) => (
                    <input
                        key={index}
                        type="text"
                        placeholder={`Destination ${index + 1}`}
                        value={destination}
                        onChange={e => handleDestinationChange(index, e.target.value)}
                    />
                ))}
                <button className="button" onClick={handleAddDestination}>Add Destination</button>
                <button className="button" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}

export default MultipleDestinationsPage;
