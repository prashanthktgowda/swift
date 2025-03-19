import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PushNotificationsPage.css';

function PushNotificationsPage() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Fetch notifications from the backend
        axios.get('/api/notifications')
            .then(response => setNotifications(response.data))
            .catch(error => console.error('Error fetching notifications:', error));
    }, []);

    return (
        <div className="container">
            <div className="card">
                <h1>Push Notifications Page</h1>
                <ul>
                    {notifications.map(notification => (
                        <li key={notification.id}>
                            {notification.message}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default PushNotificationsPage;
