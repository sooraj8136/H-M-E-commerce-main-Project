import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from 'react-hot-toast';
import { axiosInstance } from "../../config/axiosInstance";

const ResetPassword = () => {
  const { token } = useParams();
  const { darkMode } = useSelector((state) => state.mode);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();           // prevent the page rrefreshing after submitting a form
    setMessage("");
    setError("");

    if (newPassword.trim().length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    try {
      const response = await axiosInstance({
        method: "POST",
        url: `/admin/admin-reset-password/${token}`,
        data: { newPassword },
      });
      toast.success("Password reset successfully!");
      setMessage(response.data.message);
    } catch (error) {
      console.log(error)
      setError(err.response?.data?.message || "Something went wrong!");
      toast.error(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div>
      <div className="container d-flex justify-content-center align-items-center heading-head mb-4">
        <p className={darkMode ? "text-black" : "text-white"}>
          HM.com / <span className="text-danger" style={{ fontWeight: "800" }}>User Reset Password</span>
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
      </form>
    </div>
  );
};

export default ResetPassword;
