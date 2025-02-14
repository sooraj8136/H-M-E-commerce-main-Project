import React, { useState } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../config/axiosInstance";

const UserForgotPassword = () => {
  const { darkMode } = useSelector((state) => state.mode);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axiosInstance.post("/user/user-forgot-password", { email });
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div>
      <div className="container  d-flex justify-content-center align-items-center heading-head mb-4">
        <p className={darkMode ? "text-black" : "text-white "}>HM.com / <span className='text-danger' style={{
          fontWeight: "800"
        }}>User Forgot password</span> </p>
      </div>
      <div className={darkMode ? "text-black" : "text-white"}>
        <h2 className="text-center">Forgot Password</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-sec">
          <div className="mb-3" style={{ maxWidth: "400px", width: "90%", margin: "auto" }}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pass-input w-100 mt-1"
              required
            />
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button className="bg-black signin-btn" style={{ maxWidth: "400px", width: "90%" }} type="submit">Submit</button>
        </div>
        <div className="text-center mt-3">
          {message && <p style={{ color: "green" }}></p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default UserForgotPassword;
