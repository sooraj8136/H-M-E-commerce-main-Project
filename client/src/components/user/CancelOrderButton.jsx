import React, { useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import toast from "react-hot-toast";

function CancelOrderButton({ orderId, status }) {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isCancelled, setIsCancelled] = useState(status === "cancelled");

    const handleCancelOrder = async () => {
        setLoading(true);
        setMessage('');
        try {
            const response = await axiosInstance.put(`orders/cancel-order/${orderId}`);
            console.log("Cancel Order ===", response);
            setMessage('Order cancelled');
            toast.success(response.data.message);
            setIsCancelled(true);
        } catch (error) {
            console.error(error);
            const errMsg = error.response?.data?.message || 'Something went wrong';
            setMessage(errMsg);
            toast.error("Failed to cancel order.");
        } finally {
            setTimeout(() => setLoading(false), 1000);
        }
    };

    return (
        <div className="p-2">
            {!isCancelled && (
                <button
                    onClick={handleCancelOrder}
                    disabled={loading  || isCancelled}
                    style={{ backgroundColor: "black", color: "white", fontSize: ".9rem" }}
                >
                    Cancel Order
                </button>
            )}
            {message && (
                <p className="mt-2 font-medium" style={{ color: isCancelled ? "green" : "red" }}>
                    {message}
                </p>
            )}
        </div>
    );
}

export default CancelOrderButton;
