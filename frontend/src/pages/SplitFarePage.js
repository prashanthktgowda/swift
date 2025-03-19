import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import './SplitFarePage.css';

function SplitFarePage() {
    const [friends, setFriends] = useState([]);
    const [selectedFriends, setSelectedFriends] = useState([]);

    useEffect(() => {
        // Fetch friends from the backend
        axios.get('/api/users/friends')
            .then(response => setFriends(response.data))
            .catch(error => console.error('Error fetching friends:', error));
    }, []);

    const handleSplitFare = () => {
        // Handle splitting fare
        axios.post('/api/fares/split', { friends: selectedFriends })
            .then(response => console.log('Fare split successful:', response.data))
            .catch(error => console.error('Error splitting fare:', error));
    };

    return (
        <div className="split-fare-page">
            <NavBar />
            <div className="container">
                <div className="card">
                    <h1>Split Fare Page</h1>
                    <ul>
                        {friends.map(friend => (
                            <li key={friend.id}>
                                <input
                                    type="checkbox"
                                    value={friend.id}
                                    onChange={e => {
                                        if (e.target.checked) {
                                            setSelectedFriends([...selectedFriends, friend.id]);
                                        } else {
                                            setSelectedFriends(selectedFriends.filter(id => id !== friend.id));
                                        }
                                    }}
                                />
                                {friend.name}
                            </li>
                        ))}
                    </ul>
                    <button className="button" onClick={handleSplitFare}>Split Fare</button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default SplitFarePage;
