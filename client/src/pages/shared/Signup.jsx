SiGN UP Latest

import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

function Signup() {
  const { darkMode } = useSelector((state) => state.mode);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const user = {
    signup_api: "/user/signup",
    login_route: "/login",
  };

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance({
        method: "POST",
        url: signup_api,
        data: { ...data, _ts: Date.now() }
      });
      toast.success("Sign-up success! Please log in.");
      console.log("Signup response:", response);
      navigate(user.login_route);
    } catch (error) {
      console.error("Signup error:", error);

      if (
        error.response &&
        error.response.data.error === "User with this mobile number already exists"
      ) {
        toast.error("User with this mobile number already exists.");
      } else if (
        error.response &&
        error.response.data.error === "User with this email already exists"
      ) {
        toast.error("User with this email already exists.");
      } else if (error.response) {
        console.error("Server responded with:", error.response.data);
        toast.error(error.response.data.error || "Something went wrong.");
      } else if (error.request) {
        console.error("No response received:", error.request);
        toast.error("No response from server. Please try again later.");
      } else {
        console.error("Error setting up the request:", error.message);
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <>
      <div style={{ maxWidth: "400px", width: "90%", margin: "125px auto 0 auto", textAlign: "left" }}>
        <p className={`login-text ${darkMode ? "text-black" : "text-white"}`} style={{ fontSize: "18px", fontWeight: "700" }}>
          REGISTER YOUR ACCOUNT
        </p>
      </div>
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-sec">
          <div className="mb-3" style={{ maxWidth: "400px", width: "90%", margin: "auto" }}>
            <label htmlFor="name" className={`d-block ${darkMode ? "text-black" : "text-white"} nav-sec-1 fs-10 fw-normal`}>Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              id="name"
              name="name"
              className="pass-input mx-auto my-1 w-100"
              style={{ maxWidth: "400px", width: "90%" }}
            />
            {errors.name && <p className="text-danger">{errors.name.message}</p>}
          </div>

          <div className="mb-3" style={{ maxWidth: "400px", width: "90%", margin: "auto" }}>
            <label htmlFor="email" className={`d-block ${darkMode ? "text-black" : "text-white"} nav-sec-1 fs-10 fw-normal`}>Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              id="email"
              name="email"
              className="pass-input mx-auto my-1 w-100"
              style={{ maxWidth: "400px", width: "90%" }}
            />
            {errors.email && <p className="text-danger">{errors.email.message}</p>}
          </div>

          <div className="mb-3" style={{ maxWidth: "400px", width: "90%", margin: "auto" }}>
            <label htmlFor="mobile" className={`d-block ${darkMode ? "text-black" : "text-white"} nav-sec-1 fs-10 fw-normal`}>Mobile</label>
            <input
              type="tel"
              {...register("mobile", {
                required: "Mobile number is required",
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: "Enter a valid Mobile number"
                }
              })}
              id="mobile"
              name="mobile"
              className="pass-input mx-auto my-1 w-100"
              style={{ maxWidth: "400px", width: "90%" }}
            />
            {errors.mobile && <p className="text-danger">{errors.mobile.message}</p>}
          </div>

          <div className="mb-3 position-relative" style={{ maxWidth: "400px", width: "90%", margin: "auto" }}>
            <label htmlFor="password" className={`d-block ${darkMode ? "text-black" : "text-white"} nav-sec-1 fs-10 fw-normal`}>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long"
                }
              })}
              id="password"
              name="password"
              className="pass-input mx-auto my-1 w-100"
              style={{ maxWidth: "400px", width: "90%" }}
            />
            {errors.password && <p className="text-danger">{errors.password.message}</p>}
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "65%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                fontSize: "0.8rem",
                fontWeight: '600'
              }}
            >
              {showPassword ? "HIDE" : "SHOW"}
            </span>
          </div>
        </div>

        <div className="mb-3" style={{ maxWidth: "400px", width: "90%", margin: "auto" }}>
          <div className="form-check">
            <input
              type="checkbox"
              id="terms"
              {...register("terms", { required: "You must agree to the terms and conditions" })}
              className="form-check-input custom-checkbox"
            />
            <label htmlFor="terms" className={`form-check-label ${darkMode ? "text-black" : "text-white"}`} style={{ fontSize: "12px", fontWeight: "500" }}>
              Yes, email me offers, style updates, and special invites to sales and events.<br />
            </label>
          </div>
          {errors.terms && <p className="text-danger">{errors.terms.message}</p>}
          <p className="terms-n-cond" style={{ fontSize: "12px", fontWeight: "500" }}>
            By clicking ‘Become a member’, I agree to the S&M Terms and conditions.
          </p>
        </div>

        <div className="mb-3" style={{ maxWidth: "400px", width: "90%", margin: "auto" }}>
          <button className="login-text signup-btn w-100" style={{ maxWidth: "400px" }}>SIGN UP</button>
        </div>
      </form>

      <div className="d-flex justify-content-center mt-2">
        <p className="text-center">
          <Link to={user.login_route} className={`login-text ${darkMode ? "text-black" : "text-white"}`} style={{ fontSize: ".8rem" }}>
            BACK TO LOGIN
          </Link>
        </p>
      </div>
    </>
  );
}

export default Signup;
