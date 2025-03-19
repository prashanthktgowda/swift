import React, { useState } from 'react';
import axios from 'axios';
import './CashPaymentPage.css';

function CashPaymentPage() {
    const [amount, setAmount] = useState('');

    const handleCashPayment = () => {
        // Handle cash payment
        axios.post('/api/payments/cash', { amount })
            .then(response => console.log('Cash payment successful:', response.data))
            .catch(error => console.error('Error processing cash payment:', error));
    };

    return (
        <div className="container">
            <div className="card">
                <h1>Cash Payment Page</h1>
                <input
                    type="text"
                    placeholder="Amount"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                />
                <button className="button" onClick={handleCashPayment}>Pay with Cash</button>
            </div>
        </div>
    );
}

export default CashPaymentPage;
