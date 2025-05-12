import React, { useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import { Container } from "react-bootstrap";

const UserForgotPassword = () => {
  const { darkMode } = useSelector((state) => state.mode);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axiosInstance({
        method: "POST",
        url: "/user/user-forgot-password",
        data: { email }
      });
      setMessage("Password reset link sent successfully");
      toast.success("Password reset link sent successfully");
    } catch (error) {
      console.log(error)
      setMessage(error.response?.data?.message || "Something went wrong!");
      toast.error(errorMessage);
    }
  };

  return (
    <Container>
      <div>
        <div className="d-flex justify-content-center">
          <div className={`w-100 ${darkMode ? "text-black" : "text-white"}`} style={{ maxWidth: "400px", textAlign: "left", marginTop: "125px" }}>
            <p style={{ fontSize: "13px", fontWeight: "700", marginTop: "20px" }}>
              USER FORGOT PASSWORD
            </p>
          </div>
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
            <button className="bg-black signin-btn" style={{ maxWidth: "400px", width: "90%", fontWeight: "500" }} type="submit">SUBMIT</button>
          </div>
          <div className="text-center mt-3">
            {message && <p style={{ color: message.includes("wrong") ? "red" : "green" }}>{message}</p>}
          </div>
        </form>
      </div>
    </Container>
  );
};

export default UserForgotPassword;
