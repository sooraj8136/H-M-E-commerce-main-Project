import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

function Signup() {

  const { darkMode } = useSelector((state) => state.mode)
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const user = {
    signup_api: "/user/signup",
    login_route: "/login",
  };

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance({ method: "POST", url: user.signup_api, data });
      toast.success("Sign-up success! Please log in.");
      navigate(user.login_route);
    } catch (error) {
      toast.error("Sign-up failed. Please try again.");
    }
  };

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center heading-head">
        <p className={darkMode ? "text-black" : "text-white"}>HM.com / <span className='text-danger' style={{ fontWeight: "800" }}>Register</span></p>
      </div>
      <div className={darkMode ? "text-black" : "text-white"} style={{ fontSize: "20px", fontWeight: "700" }}>
        <p className="text-center">Become a H&M member</p>
      </div>
      <br />
      <div className={darkMode ? "text-black" : "text-white"} style={{ fontSize: "15px", fontWeight: "500" }}>
        <p className="text-center">Become a member-Join us today and enjoy exclusive benefits, offers, and rewards!</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-sec">
          <div className="mb-3" style={{ maxWidth: "400px", width: "90%", margin: "auto" }}>
            <label htmlFor="name" className={`d-block ${darkMode ? "text-black" : "text-white"} nav-sec-1 fs-10 fw-normal`}>Name:</label>
            <input type="text" {...register("name", { required: "Name is required" })} id="name" name="name" className="pass-input mx-auto my-1 w-100" style={{ maxWidth: "400px", width: "90%" }} required />
          </div>

          <div className="mb-3" style={{ maxWidth: "400px", width: "90%", margin: "auto" }}>
            <label htmlFor="email" className={`d-block ${darkMode ? "text-black" : "text-white"} nav-sec-1 fs-10 fw-normal`}>Email:</label>
            <input type="email" {...register("email", { required: "Email is required" })} id="email" name="email" className="pass-input mx-auto my-1 w-100" style={{ maxWidth: "400px", width: "90%" }} required />
          </div>

          <div className="mb-3" style={{ maxWidth: "400px", width: "90%", margin: "auto" }}>
            <label htmlFor="mobile" className={`d-block ${darkMode ? "text-black" : "text-white"} nav-sec-1 fs-10 fw-normal`}>Mobile:</label>
            <input type="tel" {...register("mobile", { required: "Mobile number is required" })} id="mobile" name="mobile" className="pass-input mx-auto my-1 w-100" style={{ maxWidth: "400px", width: "90%" }} required />
          </div>

          <div className="mb-3 position-relative" style={{ maxWidth: "400px", width: "90%", margin: "auto" }}>
            <label htmlFor="password" className={`d-block ${darkMode ? "text-black" : "text-white"} nav-sec-1 fs-10 fw-normal`}>Password:</label>
            <input type={showPassword ? "text" : "password"} {...register("password", { required: "Password is required" })} id="password" name="password" className="pass-input mx-auto my-1 w-100" style={{ maxWidth: "400px", width: "90%" }} required />
            <span onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: "10px", top: "65%", transform: "translateY(-50%)", cursor: "pointer", fontSize: "0.8rem", fontWeight: '600' }}>
              {showPassword ? "HIDE" : "SHOW"}
            </span>
          </div>
        </div>

        <div className="mb-3" style={{ maxWidth: "400px", width: "90%", margin: "auto" }}>
          <div className="form-check">
            <input type="checkbox" id="terms" {...register("terms", { required: "You must agree to the terms and conditions" })} className="form-check-input custom-checkbox" required />
            <label htmlFor="terms" className={`form-check-label ${darkMode ? "text-black" : "text-white"}`} style={{ fontSize: "12px", fontWeight: "500" }}>
              Yes, email me offers, style updates, and special invites to sales and events.<br />
            </label>
          </div>
          <p className={darkMode ? "text-black" : "text-white"} style={{ fontSize: "12px", fontWeight: "500" }}>
            Wish your inbox was more stylish? No problem, just subscribe to our newsletter. Find out what's hot and happening in the world of fashion, beauty, and home decor. Plus, you'll get bonus vouchers, birthday offers, and special invites to sales and events – straight to your inbox!
          </p>
          <p className="terms-n-cond" style={{ fontSize: "12px", fontWeight: "500" }}>
            By clicking ‘Become a member’, I agree to the H&M Membership Terms and conditions.
          </p>
        </div>
        <div className="mb-3" style={{ maxWidth: "400px", width: "90%", margin: "auto" }}>
          <button className="signup-btn w-100" style={{ maxWidth: "400px" }}>Become an H&M member</button>
        </div>
      </form>

      <div className="d-flex justify-content-center mt-2">
        <p className="text-center">
          <Link to={user.login_route} className={darkMode ? "text-black" : "text-white forgot-password"}>Back to Log in</Link>
        </p>
      </div>
    </>
  );
}

export default Signup;
