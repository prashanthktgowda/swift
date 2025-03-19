import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UberForBusinessPage.css';

function UberForBusinessPage() {
    const [businessInfo, setBusinessInfo] = useState([]);

    useEffect(() => {
        // Fetch Uber for Business information from the backend
        axios.get('/api/business')
            .then(response => setBusinessInfo(response.data))
            .catch(error => console.error('Error fetching Uber for Business information:', error));
    }, []);

    return (
        <div className="container">
            <div className="card">
                <h1>Uber for Business Page</h1>
                <ul>
                    {businessInfo.map(info => (
                        <li key={info.id}>
                            {info.message}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default UberForBusinessPage;
