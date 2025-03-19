import React, { useState } from 'react';
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
    const history = useHistory();

    const handleNext = () => {
        console.log('First Name:', firstName);
        console.log('Last Name:', lastName);
        console.log('Mobile Number:', mobileNumber);
        console.log('Country:', selectedCountry);
        // Redirect to the next page or perform other actions
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
        </div>
    );
}

export default RiderLoginPage;