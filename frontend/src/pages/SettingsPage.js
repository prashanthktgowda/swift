import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import './SettingsPage.css';

function SettingsPage() {
    const [settings, setSettings] = useState({});
    const [userType, setUserType] = useState('user'); // Default to 'user', can be 'driver'

    useEffect(() => {
        // Fetch settings from the backend based on user type
        axios.get(`/api/users/settings?type=${userType}`)
            .then(response => setSettings(response.data))
            .catch(error => console.error('Error fetching settings:', error));
    }, [userType]);

    const handleSaveSettings = () => {
        // Save settings to the backend
        axios.post(`/api/users/settings?type=${userType}`, settings)
            .then(response => console.log('Settings saved:', response.data))
            .catch(error => console.error('Error saving settings:', error));
    };

    return (
        <div className="settings-page">
            <NavBar />
            <div className="container">
                <div className="card">
                    <h1>{userType === 'user' ? 'User Settings' : 'Driver Settings'}</h1>
                    <div className="user-type-toggle">
                        <button
                            className={`toggle-button ${userType === 'user' ? 'active' : ''}`}
                            onClick={() => setUserType('user')}
                        >
                            User
                        </button>
                        <button
                            className={`toggle-button ${userType === 'driver' ? 'active' : ''}`}
                            onClick={() => setUserType('driver')}
                        >
                            Driver
                        </button>
                    </div>
                    <div className="settings-form">
                        <input
                            type="text"
                            placeholder="Setting 1"
                            value={settings.setting1 || ''}
                            onChange={e => setSettings({ ...settings, setting1: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Setting 2"
                            value={settings.setting2 || ''}
                            onChange={e => setSettings({ ...settings, setting2: e.target.value })}
                        />
                        {userType === 'driver' && (
                            <>
                                <input
                                    type="text"
                                    placeholder="Vehicle Info"
                                    value={settings.vehicleInfo || ''}
                                    onChange={e => setSettings({ ...settings, vehicleInfo: e.target.value })}
                                />
                                <input
                                    type="text"
                                    placeholder="License Number"
                                    value={settings.licenseNumber || ''}
                                    onChange={e => setSettings({ ...settings, licenseNumber: e.target.value })}
                                />
                            </>
                        )}
                        <button className="button" onClick={handleSaveSettings}>Save Settings</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default SettingsPage;
