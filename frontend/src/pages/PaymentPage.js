import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PaymentPage.css';

function PaymentPage() {
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [newPaymentMethod, setNewPaymentMethod] = useState('');
    const [message, setMessage] = useState(''); // Added message state

    useEffect(() => {
        // Fetch payment methods from the backend
        axios.get('/api/payments/methods')
            .then(response => setPaymentMethods(response.data))
            .catch(error => console.error('Error fetching payment methods:', error));
    }, []);

    const handleAddPaymentMethod = () => {
        if (!newPaymentMethod) return;
        // Add a new payment method
        axios.post('/api/payments/add', { method: newPaymentMethod })
            .then(response => {
                setPaymentMethods([...paymentMethods, response.data]);
                setNewPaymentMethod('');
            })
            .catch(error => console.error('Error adding payment method:', error));
    };

    return (
        <div className="container">
            <div className="card">
                <h1>Your Payment Methods</h1>
                <p>Manage your payment methods below.</p>
                <ul>
                    {paymentMethods.map(method => (
                        <li key={method.id}>
                            {method.type} - {method.details}
                        </li>
                    ))}
                </ul>
                <input
                    type="text"
                    placeholder="New Payment Method"
                    value={newPaymentMethod}
                    onChange={e => setNewPaymentMethod(e.target.value)}
                />
                <button className="button" onClick={handleAddPaymentMethod}>Add New Payment Method</button>
            </div>
        </div>
    );
}

export default PaymentPage;
