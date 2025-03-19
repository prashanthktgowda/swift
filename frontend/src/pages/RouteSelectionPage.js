import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RouteSelectionPage.css';

function RouteSelectionPage() {
    const [routes, setRoutes] = useState([]);

    useEffect(() => {
        // Fetch available routes from the backend
        axios.get('/api/routes')
            .then(response => setRoutes(response.data))
            .catch(error => console.error('Error fetching routes:', error));
    }, []);

    const handleSelectRoute = (routeId) => {
        // Handle selecting a route
        axios.post(`/api/routes/select/${routeId}`)
            .then(response => console.log('Route selected:', response.data))
            .catch(error => console.error('Error selecting route:', error));
    };

    return (
        <div className="container">
            <div className="card">
                <h1>Route Selection Page</h1>
                <ul>
                    {routes.map(route => (
                        <li key={route.id}>
                            {route.name}
                            <button className="button" onClick={() => handleSelectRoute(route.id)}>Select</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default RouteSelectionPage;
