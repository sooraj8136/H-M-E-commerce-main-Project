import React from 'react'
import { useSelector } from 'react-redux';
import { FaRegThumbsDown } from "react-icons/fa";

function PaymentCancel() {
    
    const { darkMode } = useSelector((state) => state.mode);
    const handleDoneClick = () => {
        navigate('/user/cart');
    };
    return (
        <>
            <div
                className={`text-center d-flex flex-column align-items-center justify-content-center ${darkMode ? 'text-black' : 'text-white'}`} >
                <div className="text-center d-flex flex-column align-items-center justify-content-center">
                    <p style={{ fontWeight: '700', fontSize: 'x-large', }}>Payment Failed !</p>
                    <p style={{ fontWeight: '500', }}>Try again</p>

                    <div className="d-flex justify-content-center my-3">
                        <FaRegThumbsDown
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
                        Back
                    </button>
                </div>
            </div>
        </>
    )
}

export default PaymentCancel