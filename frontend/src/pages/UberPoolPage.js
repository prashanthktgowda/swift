import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import './UberPoolPage.css';

function UberPoolPage() {
    const [poolRides, setPoolRides] = useState([]);

    useEffect(() => {
        // Fetch available pool rides from the backend
        axios.get('/api/rides/pool')
            .then(response => setPoolRides(response.data))
            .catch(error => console.error('Error fetching pool rides:', error));
    }, []);

    const handleJoinPool = (rideId) => {
        // Handle joining a pool ride
        axios.post(`/api/rides/pool/join/${rideId}`)
            .then(response => console.log('Joined pool ride:', response.data))
            .catch(error => console.error('Error joining pool ride:', error));
    };

    return (
        <div className="uber-pool-page">
            <NavBar />
            <div className="container">
                <div className="card">
                    <ul>
                        {poolRides.map(ride => (
                            <li key={ride.id}>
                                {ride.date} - {ride.destination}
                                <button className="button" onClick={() => handleJoinPool(ride.id)}>Join Pool</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default UberPoolPage;
