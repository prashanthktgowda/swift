import React from 'react';
import './RiderDashboardPage.css';

function RiderDashboardPage() {
    return (
        <div className="rider-dashboard-page">
            <h1>Welcome to your Rider Dashboard</h1>
            <p>Here you can manage your rides, profile, and more.</p>
            <div className="dashboard-sections">
                <div className="dashboard-section">
                    <h2>Upcoming Rides</h2>
                    <p>View and manage your upcoming rides.</p>
                </div>
                <div className="dashboard-section">
                    <h2>Ride History</h2>
                    <p>View your past rides and details.</p>
                </div>
                <div className="dashboard-section">
                    <h2>Profile</h2>
                    <p>Update your profile information.</p>
                </div>
                <div className="dashboard-section">
                    <h2>Payment Methods</h2>
                    <p>Manage your payment methods.</p>
                </div>
            </div>
        </div>
    );
}

export default RiderDashboardPage;
