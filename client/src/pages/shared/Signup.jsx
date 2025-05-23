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
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await axiosInstance({
        method: "POST",
        url: "/user/signup",
        data,
      });
      console.log(response);
      toast.success("Sign-up success! Please log in.");
      navigate("/login");
    } catch (error) {
      const serverError = error.response?.data?.error;

      if (serverError === "User with this mobile number already exists") {
        toast.error("User with this mobile number already exists.");
      } else if (serverError === "User with this email already exists") {
        toast.error("User with this email already exists.");
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <div className={`w-100 ${darkMode ? "text-black" : "text-white"}`} style={{ maxWidth: "400px", textAlign: "left", marginTop: "130px" }}>
          <p style={{ fontSize: "13px", fontWeight: "700", marginTop: "20px" }}>
            REGISTER <span style={{ color: "gray" }}>YOUR</span> ACCOUNT
          </p>
        </div>
      </div>

      {loading && (
        <div style={{ textAlign: "center", marginBottom: "15px" }}>
          <div className="dot-spinner">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
          <p className="text-dark mt-2" style={{ fontSize: "16px" }}>Signing you up Please wait...</p>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-sec">
          <div className="mb-3" style={{ maxWidth: "400px", width: "90%", margin: "auto" }}>
            <label htmlFor="name" className={`d-block ${darkMode ? "text-black" : "text-white"} nav-sec-1 fs-10 fw-normal`}>Name</label>
            <input
              id="name"
              type="text"
              className="pass-input mx-auto my-1 w-100"
              placeholder="Enter your name"
              style={{ maxWidth: "400px", width: "90%" }}
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="text-danger">{errors.name.message}</p>}
          </div>

          <div className="mb-3" style={{ maxWidth: "400px", width: "90%", margin: "auto" }}>
            <label htmlFor="email" className={`d-block ${darkMode ? "text-black" : "text-white"} nav-sec-1 fs-10 fw-normal`}>Email</label>
            <input
              id="email"
              type="email"
              className="pass-input mx-auto my-1 w-100"
              placeholder="Enter your email"
              style={{ maxWidth: "400px", width: "90%" }}
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-danger">{errors.email.message}</p>}
          </div>

          <div className="mb-3" style={{ maxWidth: "400px", width: "90%", margin: "auto" }}>
            <label htmlFor="mobile" className={`d-block ${darkMode ? "text-black" : "text-white"} nav-sec-1 fs-10 fw-normal`}>Mobile</label>
            <input
              id="mobile"
              type="tel"
              className="pass-input mx-auto my-1 w-100"
              placeholder="Enter your mobile"
              style={{ maxWidth: "400px", width: "90%" }}
              {...register("mobile", {
                required: "Mobile number is required",
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: "Enter a valid Mobile number"
                }
              })}
            />
            {errors.mobile && <p className="text-danger">{errors.mobile.message}</p>}
          </div>

          <div className="mb-3 position-relative" style={{ maxWidth: "400px", width: "90%", margin: "auto" }}>
            <label htmlFor="password" className={`d-block ${darkMode ? "text-black" : "text-white"} nav-sec-1 fs-10 fw-normal`}>Password</label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className="pass-input mx-auto my-1 w-100"
              placeholder="Enter your password"
              style={{ maxWidth: "400px", width: "90%" }}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters"
                }
              })}
            />
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
            {errors.password && <p className="text-danger">{errors.password.message}</p>}
          </div>
        </div>

        <div className="mb-3" style={{ maxWidth: "400px", width: "90%", margin: "auto" }}>
          <div className="form-check">
            <input
              id="terms"
              type="checkbox"
              className="form-check-input custom-checkbox"
              {...register("terms", { required: "You must agree to the terms and conditions" })}
            />
            <label htmlFor="terms" className={`form-check-label ${darkMode ? "text-black" : "text-white"}`} style={{ fontSize: "12px", fontWeight: "500" }}>
              Yes, email me offers, style updates, and special invites to sales and events.
            </label>
          </div>
          {errors.terms && <p className="text-danger">{errors.terms.message}</p>}
          <p className="terms-n-cond" style={{ fontSize: "12px", fontWeight: "500" }}>
            By clicking ‘Become a member’, I agree to the S&M Terms and conditions.
          </p>
        </div>

        <div className="mb-3" style={{ maxWidth: "400px", width: "90%", margin: "auto" }}>
          <button
            type="submit"
            className="login-text signup-btn w-100"
            style={{ maxWidth: "400px", opacity: loading ? 0.6 : 1, cursor: loading ? "not-allowed" : "pointer" }}
            disabled={loading}>
            SIGN UP
          </button>
        </div>
      </form>

      <div className="d-flex justify-content-center mt-2">
        <p className="text-center">
          <Link to="/login" className={`login-text ${darkMode ? "text-black" : "text-white"}`} style={{ fontSize: ".8rem" }}>
            BACK TO LOGIN
          </Link>
        </p>
      </div>
    </>
  );
}

export default Signup;
