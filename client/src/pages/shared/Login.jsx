import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { Container } from "react-bootstrap";

const Login = () => {
  const { darkMode } = useSelector((state) => state.mode);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const user = { login_api: "/user/login", profile_route: "/user/profile", signup_route: "/signup" };

  const onSubmit = async (data) => {
    try {
      console.log("Data  :- ", data);
      const response = await axiosInstance({
        method: "POST",
        url: user.login_api,
        data
      });
      console.log(response, "====response");
      toast.success("Log-in success");
      navigate(user.profile_route);
    } catch (error) {
      console.log(error);

      if (error.response && error.response.data) {
        const errorMessage = error.response.data.error || error.response.data.message;

        if (errorMessage === "Incorrect password") {
          toast.error("Incorrect password. Please try again.");
        } else if (errorMessage === "User not found") {
          toast.error("User not found. Please check your email.");
        } else if (errorMessage === "User is already deactivated!") {
          toast.error("Sorry, your account has been deactivated. Contact admin.");
        } else {
          toast.error(errorMessage || "Log-in failed. Please try again.");
        }
      } else {
        toast.error("Log-in failed. Please try again.");
      }
    }
  };

  return (
    <>
      <Container>
        <div className="d-flex justify-content-center">
          <div className={`w-100 ${darkMode ? "text-black" : "text-white"}`} style={{ maxWidth: "400px", textAlign: "left", marginTop: "130px" }}>
            <p style={{ fontSize: "13px", fontWeight: "700", marginTop: "20px" }}>
             SIGN IN <span style={{color:"red"}}>YOUR</span> ACCOUNT
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-sec">
            <div className="mb-3" style={{ maxWidth: "400px", width: "90%", margin: "auto" }}>
              <label htmlFor="email" className={`d-block ${darkMode ? "text-black" : "text-white nav-sec-1 fs-10 fw-normal"}`}>
                Email
              </label>
              <input
                type="email"
                {...register("email")}
                id="email"
                name="email"
                className="pass-input w-100 mt-1"
                placeholder="Enter your email"
                style={{ border: "1px solid gray" }}
                required
              />
            </div>
            <div className="mb-3 position-relative" style={{ maxWidth: "400px", width: "90%", margin: "auto" }}>
              <label htmlFor="password" className={`d-block ${darkMode ? "text-black" : "text-white nav-sec-1 fs-10 fw-normal"}`}>
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                id="password"
                name="password"
                className="pass-input w-100 mt-1"
                placeholder="Enter your password"
                style={{ border: "1px solid gray" }}
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "68%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  fontSize: "0.7rem",
                  fontWeight: '600'
                }}
              >
                {showPassword ? "HIDE" : "SHOW"}
              </span>
            </div>
          </div>
          <div className="mb-4" style={{ maxWidth: "400px", width: "90%", margin: "10px auto 0 auto", textAlign: "left" }}>
            <Link to="/user/user-forgot-password" className={`${darkMode ? "text-black" : "text-white"} forgot-password no-underline`} style={{ fontSize: "13px", fontWeight: "600" }}>
              Forgot password?
            </Link>
          </div>
          <div className="d-flex justify-content-center">
            <button className="bg-black signin-btn" style={{ maxWidth: "400px", width: "90%" }}>
              SIGN IN
            </button>
          </div>
        </form>
        <div className="d-flex justify-content-center mt-3">
          <Link
            to={user.signup_route}
            className={`login-text ${darkMode ? "text-black" : "text-white"}`}
            style={{ fontSize: ".8rem", color: "black" }}
          >
            BECOME AN S&J MEMBER
          </Link>
        </div>
      </Container>
    </>
  );
};

export default Login;
