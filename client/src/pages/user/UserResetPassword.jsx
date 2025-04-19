import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";

const UserResetPassword = () => {
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
      setError("Password must be at least 8 characters long.");
      return;
    }

    try {
      const response = await axiosInstance({
        method: "POST",
        url: `/user/user-reset-password/${token}`,
        data: { newPassword }
      });
      toast.success("Password reset successfully!");
      setMessage(response.data.message);
    } catch (err) {
      console.log(error)
      setError(err.response?.data?.message || "Something went wrong!");
      toast.error(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div>
      <div className={darkMode ? "text-black" : "text-white"}>
        <h2 className="text-center" style={{ marginTop: "120px" }}>Reset Password</h2>
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

export default UserResetPassword;
