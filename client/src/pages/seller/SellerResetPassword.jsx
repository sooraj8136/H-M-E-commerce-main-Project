import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../config/axiosInstance";

const SellerResetPassword = () => {
    const { darkMode } = useSelector((state) => state.mode);
  const { token } = useParams(); 
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (newPassword.trim().length < 8) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await axiosInstance.post(
        `/seller/seller-reset-password/${token}`, 
        { newPassword }
      );
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!"); 
    }
  };

  return (
    <div>
      <div className="container d-flex justify-content-center align-items-center heading-head mb-4">
        <p className={darkMode ? "text-black" : "text-white "}>
          HM.com / <span className="text-danger" style={{ fontWeight: "800" }}>Seller Reset Password</span>
        </p>
      </div>
  
      <div className={darkMode ? "text-black" : "text-white"}>
        <h2 className="text-center">Reset Password</h2>
      </div>
  
      <form onSubmit={handleSubmit}>
        <div className="input-sec">
          <div className="mb-3" style={{ maxWidth: "400px", width: "90%", margin: "auto" }}>
            <input
              type="password"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="pass-input w-100 mt-1"
              required
            />
          </div>
        </div>
  
        <div className="d-flex justify-content-center">
          <button className="bg-black signin-btn" style={{ maxWidth: "400px", width: "90%" }} type="submit">
            Reset Password
          </button>
        </div>
  
        <div className="text-center mt-3">
          {message && <p style={{ color: message.includes("wrong") ? "red" : "green" }}>{message}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </form>
    </div>
  );
  
};

export default SellerResetPassword;
