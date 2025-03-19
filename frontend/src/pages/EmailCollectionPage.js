import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './EmailCollectionPage.css';

function EmailCollectionPage() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleNext = async () => {
        if (!email) {
            setError('Please enter a valid email address.');
            return;
        }

        try {
            const response = await fetch('/api/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                localStorage.setItem('riderEmail', email);
                history.push('/signup/rider-login');
            } else {
                const data = await response.json();
                setError(data.message || 'Failed to send OTP. Please try again.');
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="email-collection-page">
            <h2>What's your phone number or email?</h2>
            {error && <p className="error-message">{error}</p>}
            <input
                type="email"
                placeholder="Enter phone number or email"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                    setError(''); // Clear error on input change
                }}
                className="input-field"
            />
            <button className="button" onClick={handleNext}>Continue</button>
            <div className="divider">
                <span>or</span>
            </div>
            <button className="button google-button">Continue with Google</button>
            <button className="button apple-button">Continue with Apple</button>
            <button className="button qr-button">Log in with QR code</button>
            <p className="consent-text">
                By proceeding, you consent to get calls, WhatsApp or SMS/RCS messages, including by automated means, from Uber and its affiliates to the number provided.
            </p>
        </div>
    );
}

export default EmailCollectionPage;
