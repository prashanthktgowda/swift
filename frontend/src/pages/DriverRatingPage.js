import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DriverRatingPage.css';

function DriverRatingPage() {
    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        // Fetch drivers from the backend
        axios.get('/api/drivers')
            .then(response => setDrivers(response.data))
            .catch(error => console.error('Error fetching drivers:', error));
    }, []);

    const handleRateDriver = (driverId, rating) => {
        // Handle rating a driver
        axios.post(`/api/drivers/rate/${driverId}`, { rating })
            .then(response => console.log('Driver rated:', response.data))
            .catch(error => console.error('Error rating driver:', error));
    };

    return (
        <div className="container">
            <div className="card">
                <h1>Driver Rating Page</h1>
                <ul>
                    {drivers.map(driver => (
                        <li key={driver.id}>
                            {driver.name}
                            <button className="button" onClick={() => handleRateDriver(driver.id, 5)}>Rate 5</button>
                            <button className="button" onClick={() => handleRateDriver(driver.id, 4)}>Rate 4</button>
                            <button className="button" onClick={() => handleRateDriver(driver.id, 3)}>Rate 3</button>
                            <button className="button" onClick={() => handleRateDriver(driver.id, 2)}>Rate 2</button>
                            <button className="button" onClick={() => handleRateDriver(driver.id, 1)}>Rate 1</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default DriverRatingPage;
