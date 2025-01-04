import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate('/');
    };

    return (
        <div>
            <h1>Payment Successful!</h1>
            <p>Thank you for your purchase. Your order has been processed successfully.</p>
            <button onClick={goToHome}>Go to Home</button>
        </div>
    );
};

export default PaymentSuccess;
