import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './RiderLoginPage.css';

const countries = [
    { code: 'IN', name: 'India', flag: 'https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg', dialCode: '+91' },
    { code: 'US', name: 'United States', flag: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg', dialCode: '+1' },
    { code: 'GB', name: 'United Kingdom', flag: 'https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg', dialCode: '+44' },
    // Add more countries as needed
];

function RiderLoginPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(countries[0]);
    const [showOTPInput, setShowOTPInput] = useState(false);
    const [showSetPassword, setShowSetPassword] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '']);
    const [password, setPassword] = useState('');
    const history = useHistory();
    const email = localStorage.getItem('riderEmail');

    useEffect(() => {
        if (!email) {
            history.push('/signup');
        }
    }, [email, history]);

    const handleNext = async () => {
        // Send OTP to user's email
        try {
            const response = await fetch('/api/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }), // Use stored email
            });

            if (response.ok) {
                setShowOTPInput(true);
            } else {
                console.error('Failed to send OTP');
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
        }
    };

    const handleConfirmOTP = async () => {
        const enteredOtp = otp.join('');
        try {
            const response = await fetch('/api/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp: enteredOtp }),
            });

            if (response.ok) {
                setShowOTPInput(false);
                setShowSetPassword(true);
            } else {
                const data = await response.json();
                alert(data.message || 'Invalid OTP. Please try again.');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            alert('An error occurred. Please try again.');
        }
    };

    const handleSetPassword = async () => {
        try {
            const response = await fetch('/api/set-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                history.push('/terms-and-conditions');
            } else {
                const data = await response.json();
                alert(data.message || 'Failed to set password. Please try again.');
            }
        } catch (error) {
            console.error('Error setting password:', error);
            alert('An error occurred. Please try again.');
        }
    };

    const handleOtpChange = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
    };

    return (
        <div className="rider-login-page">
            <h2>Confirm your information</h2>
            <div className="input-group">
                <input
                    type="text"
                    placeholder="Enter first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="Enter last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input-field"
                />
            </div>
            <div className="input-group">
                <div className="country-selector">
                    <img src={selectedCountry.flag} alt={`${selectedCountry.name} Flag`} />
                    <select
                        value={selectedCountry.code}
                        onChange={(e) => {
                            const country = countries.find(c => c.code === e.target.value);
                            setSelectedCountry(country);
                        }}
                    >
                        {countries.map((country) => (
                            <option key={country.code} value={country.code}>
                                {country.dialCode}
                            </option>
                        ))}
                    </select>
                </div>
                <input
                    type="text"
                    placeholder={`${selectedCountry.dialCode} Mobile number`}
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="input-field"
                />
            </div>
            <div className="button-group">
                <button className="back-button" onClick={() => history.goBack()}>
                    <span className="arrow">←</span>
                </button>
                <button className="next-button" onClick={handleNext}>
                    Next <span className="arrow">→</span>
                </button>
            </div>

            {showOTPInput && (
                <div className="otp-section">
                    <h3>Enter the 4-digit code sent to your email</h3>
                    <div className="otp-inputs">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                className="otp-input"
                            />
                        ))}
                    </div>
                    <div className="button-group">
                        <button className="back-button" onClick={() => setShowOTPInput(false)}>
                            <span className="arrow">←</span>
                        </button>
                        <button className="next-button" onClick={handleConfirmOTP}>
                            Confirm <span className="arrow">→</span>
                        </button>
                    </div>
                </div>
            )}

            {showSetPassword && (
                <div className="set-password-modal">
                    <div className="set-password-content">
                        <h3>Set your password</h3>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-field"
                        />
                        <div className="button-group">
                            <button className="back-button" onClick={() => setShowSetPassword(false)}>
                                <span className="arrow">←</span>
                            </button>
                            <button className="next-button" onClick={handleSetPassword}>
                                Next <span className="arrow">→</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RiderLoginPage;