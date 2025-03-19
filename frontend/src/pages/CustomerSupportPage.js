import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CustomerSupportPage.css';

function CustomerSupportPage() {
    const [supportMessages, setSupportMessages] = useState([]);

    useEffect(() => {
        // Fetch support messages from the backend
        axios.get('/api/support')
            .then(response => setSupportMessages(response.data))
            .catch(error => console.error('Error fetching support messages:', error));
    }, []);

    return (
        <div className="container">
            <div className="card">
                <h1>Customer Support Page</h1>
                <ul>
                    {supportMessages.map(message => (
                        <li key={message.id}>
                            {message.message}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CustomerSupportPage;
