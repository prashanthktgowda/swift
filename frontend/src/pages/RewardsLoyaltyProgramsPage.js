import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RewardsLoyaltyProgramsPage.css';

function RewardsLoyaltyProgramsPage() {
    const [rewards, setRewards] = useState([]);

    useEffect(() => {
        // Fetch rewards from the backend
        axios.get('/api/rewards')
            .then(response => setRewards(response.data))
            .catch(error => console.error('Error fetching rewards:', error));
    }, []);

    return (
        <div className="container">
            <div className="card">
                <h1>Rewards & Loyalty Programs Page</h1>
                <ul>
                    {rewards.map(reward => (
                        <li key={reward.id}>
                            {reward.description} - {reward.points} points
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default RewardsLoyaltyProgramsPage;
