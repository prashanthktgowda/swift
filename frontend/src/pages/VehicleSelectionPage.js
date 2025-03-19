import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import './VehicleSelectionPage.css';

function VehicleSelectionPage() {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        // Fetch available vehicles from the backend
        axios.get('/api/vehicles')
            .then(response => setVehicles(response.data))
            .catch(error => console.error('Error fetching vehicles:', error));
    }, []);

    const handleSelectVehicle = (vehicleId) => {
        // Handle selecting a vehicle
        axios.post(`/api/vehicles/select/${vehicleId}`)
            .then(response => console.log('Vehicle selected:', response.data))
            .catch(error => console.error('Error selecting vehicle:', error));
    };

    return (
        <div className="vehicle-selection-page">
            <NavBar />
            <div className="container">
                <div className="card">
                    <h1>Vehicle Selection Page</h1>
                    <ul>
                        {vehicles.map(vehicle => (
                            <li key={vehicle.id}>
                                {vehicle.type} - {vehicle.model}
                                <button className="button" onClick={() => handleSelectVehicle(vehicle.id)}>Select</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default VehicleSelectionPage;
