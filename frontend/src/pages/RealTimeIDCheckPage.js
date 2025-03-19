import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RealTimeIDCheckPage.css';

function RealTimeIDCheckPage() {
    const [idCheckInfo, setIdCheckInfo] = useState([]);

    useEffect(() => {
        // Fetch ID check information from the backend
        axios.get('/api/id-check')
            .then(response => setIdCheckInfo(response.data))
            .catch(error => console.error('Error fetching ID check information:', error));
    }, []);

    return (
        <div className="container">
            <div className="card">
                <h1>Real-Time ID Check Page</h1>
                <ul>
                    {idCheckInfo.map(info => (
                        <li key={info.id}>
                            {info.status}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default RealTimeIDCheckPage;
