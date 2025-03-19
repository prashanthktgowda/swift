import React from 'react';
import { useHistory } from 'react-router-dom';
import './TermsAndConditionsPage.css';

function TermsAndConditionsPage() {
    const history = useHistory();

    const handleAccept = () => {
        history.push('/rider-dashboard');
    };

    return (
        <div className="terms-and-conditions-page">
            <h1>Terms and Conditions</h1>
            <div className="terms-content">
                <p>
                    By using this service, you agree to the following terms and conditions. Please read them carefully before proceeding.
                </p>
                <ul>
                    <li>You must be at least 18 years old to use this service.</li>
                    <li>All rides must comply with local traffic laws and regulations.</li>
                    <li>Payment for rides must be completed promptly.</li>
                    <li>Uber reserves the right to suspend or terminate accounts for violations of these terms.</li>
                </ul>
                <p>
                    For more details, please refer to our <a href="/terms">full terms and conditions</a>.
                </p>
            </div>
            <button className="button accept-button" onClick={handleAccept}>
                Accept and Continue
            </button>
        </div>
    );
}

export default TermsAndConditionsPage;
