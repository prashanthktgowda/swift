import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // Import styles for Footer

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-column">
                    <h3>Company</h3>
                    <ul>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/careers">Careers</Link></li>
                        <li><Link to="/press">Press</Link></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3>Support</h3>
                    <ul>
                        <li><Link to="/help">Help Center</Link></li>
                        <li><Link to="/safety">Safety</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3>Legal</h3>
                    <ul>
                        <li><Link to="/terms">Terms of Service</Link></li>
                        <li><Link to="/privacy">Privacy Policy</Link></li>
                        <li><Link to="/cookie-policy">Cookie Policy</Link></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
