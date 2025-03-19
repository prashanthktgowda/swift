import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboardPage.css';

function AdminDashboardPage() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch users from the backend
        axios.get('/api/admin/users')
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    return (
        <div className="container">
            <div className="card">
                <h1>Admin Dashboard Page</h1>
                <ul>
                    {users.map(user => (
                        <li key={user.id}>
                            {user.name} - {user.email}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default AdminDashboardPage;
