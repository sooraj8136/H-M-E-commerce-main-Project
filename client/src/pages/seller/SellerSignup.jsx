import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

function SellerSignup() {
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
        url: "/seller/register-seller",
        data,
      });
      setTimeout(() => {
        console.log(response)
        toast.success("Seller Sign-up success! Please log in.");
        navigate("/seller/login");
      }, 6000);
    } catch (error) {
      setTimeout(() => {
        if (error.response?.data?.error === "Seller with this mobile number already exists") {
          toast.error("Seller with this mobile number already exists.");
        } else if (error.response?.data?.error === "Seller with this email already exists") {
          toast.error("Seller with this email already exists.");
        }
      }, 6000);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 6000);
    }
  };

  return (
    <>
      <div style={{ maxWidth: "400px", width: "90%", margin: "125px auto 0", textAlign: "left" }}>
        <p className={`login-text ${darkMode ? "text-black" : "text-white"}`} style={{ fontSize: "18px", fontWeight: "700" }}>
          REGISTER SELLER ACCOUNT
        </p>
      </div>

      {loading && (
        <div style={{ textAlign: "center", marginBottom: "15px" }}>
          <div className="dot-spinner">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
          <p className="text-dark mt-2" style={{ fontSize: "16px" }}>Signing you up...</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-sec">
          <div className="mb-3" style={{ maxWidth: "400px", width: "90%", margin: "auto" }}>
            <label htmlFor="name" className={`d-block ${darkMode ? "text-black" : "text-white"} nav-sec-1 fs-10 fw-normal`}>Name</label>
            <input type="text" {...register("name", { required: "Name is required" })} className="pass-input mx-auto my-1 w-100" required />
            {errors.name && <p className="text-danger">{errors.name.message}</p>}
          </div>

          <div className="mb-3" style={{ maxWidth: "400px", width: "90%", margin: "auto" }}>
            <label htmlFor="email" className={`d-block ${darkMode ? "text-black" : "text-white"} nav-sec-1 fs-10 fw-normal`}>Email</label>
            <input type="email" {...register("email", { required: "Email is required" })} className="pass-input mx-auto my-1 w-100" required />
            {errors.email && <p className="text-danger">{errors.email.message}</p>}
          </div>

          <div className="mb-3" style={{ maxWidth: "400px", width: "90%", margin: "auto" }}>
            <label htmlFor="mobile" className={`d-block ${darkMode ? "text-black" : "text-white"} nav-sec-1 fs-10 fw-normal`}>Mobile</label>
            <input type="tel" {...register("mobile", { required: "Mobile is required" })} className="pass-input mx-auto my-1 w-100" required />
            {errors.mobile && <p className="text-danger">{errors.mobile.message}</p>}
          </div>

          <div className="mb-3" style={{ maxWidth: "400px", width: "90%", margin: "auto" }}>
            <label htmlFor="storeName" className={`d-block ${darkMode ? "text-black" : "text-white"} nav-sec-1 fs-10 fw-normal`}>Store Name</label>
            <input type="text" {...register("storeName", { required: "Store Name is required" })} className="pass-input mx-auto my-1 w-100" required />
            {errors.storeName && <p className="text-danger">{errors.storeName.message}</p>}
          </div>

          <div className="mb-3" style={{ maxWidth: "400px", width: "90%", margin: "auto" }}>
            <label htmlFor="address" className={`d-block ${darkMode ? "text-black" : "text-white"} nav-sec-1 fs-10 fw-normal`}>Store Address</label>
            <input type="text" {...register("address", { required: "Address is required" })} className="pass-input mx-auto my-1 w-100" required />
            {errors.address && <p className="text-danger">{errors.address.message}</p>}
          </div>

          <div className="mb-3 position-relative" style={{ maxWidth: "400px", width: "90%", margin: "auto" }}>
            <label htmlFor="password" className={`d-block ${darkMode ? "text-black" : "text-white"} nav-sec-1 fs-10 fw-normal`}>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: "Password is required" })}
              className="pass-input mx-auto my-1 w-100"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "65%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                fontSize: "0.7rem",
                fontWeight: "600",
                color: darkMode ? "black" : "white",
              }}
            >
              {showPassword ? "HIDE" : "SHOW"}
            </span>
            {errors.password && <p className="text-danger">{errors.password.message}</p>}
          </div>
        </div>

        <div className="mb-3" style={{ maxWidth: "400px", width: "90%", margin: "auto" }}>
          <button className="signup-btn w-100" type="submit" disabled={loading} style={{ opacity: loading ? 0.6 : 1 }}>
            SIGN UP
          </button>
        </div>
      </form>

      <div className="d-flex justify-content-center">
        <Link
          to="/seller/login"
          className="signup-btn d-flex justify-content-center align-items-center text-black text-decoration-none"
          style={{
            maxWidth: "400px",
            width: "90%",
            backgroundColor: "white",
          }}
        >
          Back to Sign in
        </Link>
      </div>
    </>
  );
}

export default SellerSignup;
