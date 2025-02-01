import React from "react";
import { useNavigate } from "react-router-dom";
import { LiaThumbsUpSolid } from "react-icons/lia";
import { useSelector } from "react-redux";


function SuccessReview() {

    const { darkMode } = useSelector((state) => state.mode)

    const navigate = useNavigate();
    const handleDoneClick = () => {
        navigate("/product");
    };

    return (
        <div className={darkMode ? "text-black" : "text-white text-center d-flex flex-column align-items-center justify-content-center"}>
            <div className="text-center d-flex flex-column align-items-center justify-content-center">
                <p style={{
                    fontWeight: "700",
                    fontSize: "x-large"
                }}>Thank you for your awesome feedback</p>
                <p style={{
                    fontWeight: "500",
                }}>We are delighted that you like our experience. Happy shopping!</p>

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
}

export default SuccessReview;
