import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                history.push(data.redirect);
            } else {
                setError(data.message);
            }
        } catch (err) {
            console.error('Error logging in:', err);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="login-page">
            <form onSubmit={handleLogin}>
                <h1>Login</h1>
                {error && <p className="error">{error}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" className="button">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;
