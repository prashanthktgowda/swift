import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import '../styles/ButtonStyles.css'; // Import button styles

function NavBar() {
    return (
        <header className="navbar">
            <div className="logo">
                <Link to="/"><h1>Uber</h1></Link> {/* Redirect to home page */}
            </div>
            <nav className="nav-links">
                <Link to="/ride" className="nav-link">Ride</Link>
                <Link to="/drive" className="nav-link">Drive</Link>
                <Link to="/business" className="nav-link">Business</Link>
                <Link to="/about" className="nav-link">About</Link>
            </nav>
            <div className="auth-buttons">
                <button className="button secondary">EN</button>
                <Link to="/help" className="button">Help</Link>
                <Link to="/login" className="button">Log in</Link>
                <Link to="/signup" className="button signup-button">Sign up</Link>
            </div>
        </header>
    );
}

export default NavBar;
