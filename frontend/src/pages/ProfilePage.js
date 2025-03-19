import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import './ProfilePage.css';

function ProfilePage() {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        mobile: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState(''); // Added message state
    const userId = localStorage.getItem('userId'); // Assume userId is stored in localStorage after login

    useEffect(() => {
        // Fetch profile details from the backend
        axios.get(`/api/users/profile/${userId}`)
            .then(response => setProfile(response.data))
            .catch(error => console.error('Error fetching profile:', error));
    }, [userId]);

    const handleSave = () => {
        // Save updated profile details
        axios.post(`/api/users/profile/${userId}`, profile)
            .then(response => {
                console.log('Profile updated:', response.data);
                setIsEditing(false);
                alert('Profile updated successfully!');
            })
            .catch(error => {
                console.error('Error updating profile:', error);
                alert('Error updating profile. Please try again.');
            });
    };

    return (
        <div className="container">
            <NavBar />
            <div className="card">
                <h1>Your Profile</h1>
                <div className="profile-picture">
                    <img src="/default-profile.png" alt="Profile" />
                </div>
                <p>Manage your account details below.</p>
                {isEditing ? (
                    <>
                        <input
                            type="text"
                            placeholder="Name"
                            value={profile.name}
                            onChange={e => setProfile({ ...profile, name: e.target.value })}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={profile.email}
                            onChange={e => setProfile({ ...profile, email: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Mobile"
                            value={profile.mobile}
                            onChange={e => setProfile({ ...profile, mobile: e.target.value })}
                        />
                        <button className="button" onClick={handleSave}>Update Profile</button>
                    </>
                ) : (
                    <>
                        <p><strong>Name:</strong> {profile.name}</p>
                        <p><strong>Email:</strong> {profile.email}</p>
                        <p><strong>Mobile:</strong> {profile.mobile}</p>
                        <button className="button" onClick={() => setIsEditing(true)}>Edit Details</button>
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default ProfilePage;
