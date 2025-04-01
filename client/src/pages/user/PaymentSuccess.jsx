import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { LiaThumbsUpSolid } from 'react-icons/lia';

const PaymentSuccess = () => {
    const { darkMode } = useSelector((state) => state.mode);
    const navigate = useNavigate();

    useEffect(() => {
        const handlePostPayment = async () => {
            try {
                console.log("Attempting to clear cart...");
                const clearCartResponse = await axiosInstance({
                    method: "DELETE",
                    url: "/cart/clear-cart"
                });
                console.log("Clear Cart Response:", clearCartResponse);
                toast.success('Your payment was successful');

                console.log("Attempting to update stock...");
                const response = await axiosInstance({
                    method: "POST",
                    url: "/orders/update-stock"
                });
                console.log("Stock Update Response:", response);

                if (response.status === 200) {
                    toast.success('Stock updated successfully!');
                } else {
                    toast.error('Failed to update stock.');
                }
            } catch (error) {
                toast.error('Something went wrong');
                console.error("API Error:", error);
            }
        };

        handlePostPayment();
    }, []);


    const handleDoneClick = () => {
        navigate('/user/orders');
    };

    return (
        <div
            className={`text-center d-flex flex-column align-items-center justify-content-center ${darkMode ? 'text-black' : 'text-white'}`} >
            <div className="text-center d-flex flex-column align-items-center justify-content-center">
                <p style={{ fontWeight: '700', fontSize: 'x-large', }}>Thank you for your purchase</p>
                <p style={{ fontWeight: '500', }}>Happy shopping!</p>

                <div className="d-flex justify-content-center my-3">
                    <LiaThumbsUpSolid
                        size={50}
                        style={{ color: darkMode ? '#000' : '#fff' }}
                    />
                </div>

                <button
                    className="signup-first-btn my-1 w-90"
                    style={{
                        maxWidth: '400px',
                        width: '90%',
                        fontWeight: '700',
                        backgroundColor: 'black',
                        color: 'white',
                        border: '1px solid white',
                    }}
                    onClick={handleDoneClick}
                >
                    Done
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccess;
