import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";

const ResetPassword = () => {
  const { token } = useParams(); // Extract token from the URL
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
        `/admin/admin-reset-password/${token}`,
        { newPassword }
      );
      setMessage(response.data.message); 
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!"); 
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter your new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ResetPassword;
