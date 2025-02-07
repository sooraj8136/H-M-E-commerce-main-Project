import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { LiaThumbsUpSolid } from 'react-icons/lia';

const PaymentSuccess = () => {
    const { darkMode } = useSelector((state) => state.mode)
    const navigate = useNavigate();

    useEffect(() => {
        const clearCart = async () => {
            try {
                await axiosInstance.delete('/cart/clear-cart');
                toast.success('Your payment successful, Cart has been cleared!');
            } catch (error) {
                toast.error('Failed to clear cart');
                console.error(error);
            }
        };

        clearCart();
    }, []);

    const handleDoneClick = () => {
        navigate("/user/orders");
    };

    return (
        <div className={darkMode ? "text-black" : "text-white text-center d-flex flex-column align-items-center justify-content-center"}>
            <div className="text-center d-flex flex-column align-items-center justify-content-center">
                <p style={{
                    fontWeight: "700",
                    fontSize: "x-large"
                }}>Thank you for your purchasing :)</p>
                <p style={{
                    fontWeight: "500",
                }}>Happy shopping!</p>

                <div className="d-flex justify-content-center my-3">
                    <LiaThumbsUpSolid size={50} style={{ color: darkMode ? "#000" : "#fff" }} />
                </div>

                <button
                    className="signup-first-btn my-1 w-90"
                    style={{
                        maxWidth: "400px",
                        width: "90%",
                        fontWeight: "700",
                        backgroundColor: "black",
                        color: "white",
                        border: "1px solid white"
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
