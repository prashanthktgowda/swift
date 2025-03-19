import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './SignUpPage.css';

function SignUpPage() {
    const history = useHistory();
    const [email, setEmail] = useState('');

    const handleClose = () => {
        history.push('/');
    };

    const handleNext = async () => {
        if (!email) {
            alert('Please enter a valid email address.');
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
                alert(data.message || 'Failed to send OTP. Please try again.');
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="signup-page">
            <button className="close-button" onClick={handleClose}>×</button>
            <h1>Sign up</h1>
            <div className="signup-options">
                <div className="signup-option" onClick={() => history.push('/signup/drive-deliver')}>
                    <h3>Sign up to drive & deliver</h3>
                    <span>→</span>
                </div>
                <div className="signup-option" onClick={() => history.push('/signup/rider-email')}>
                    <h3>Create a rider account</h3>
                    <span>→</span>
                </div>
                <div className="signup-option" onClick={() => history.push('/signup/uber-eats')}>
                    <h3>Order delivery with Uber Eats</h3>
                    <span>→</span>
                </div>
                <div className="signup-option" onClick={() => history.push('/signup/business')}>
                    <h3>Sign up for Uber for Business</h3>
                    <span>→</span>
                </div>
            </div>
            <div className="email-input-section">
                <h2>What's your phone number or email?</h2>
                <input
                    type="email"
                    placeholder="Enter phone number or email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                />
                <button className="button" onClick={handleNext}>Continue</button>
            </div>
        </div>
    );
}

export default SignUpPage;
