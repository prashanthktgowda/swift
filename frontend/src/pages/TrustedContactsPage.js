import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import './TrustedContactsPage.css';

function TrustedContactsPage() {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        // Fetch trusted contacts from the backend
        axios.get('/api/contacts')
            .then(response => setContacts(response.data))
            .catch(error => console.error('Error fetching contacts:', error));
    }, []);

    return (
        <div className="trusted-contacts-page">
            <NavBar />
            <div className="container">
                <div className="card">
                    <ul>
                        {contacts.map(contact => (
                            <li key={contact.id}>
                                {contact.name} - {contact.phone}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default TrustedContactsPage;
