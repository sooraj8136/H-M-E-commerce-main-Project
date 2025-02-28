import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

const AdminLogin = () => {
  const { darkMode } = useSelector((state) => state.mode);

  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const admin = {
    login_api: "/admin/admin-login",
    dashboard_route: "/admin/admin-dashboard",
    signup_route: "/admin/signup",
  };

  const onSubmit = async (data) => {
    try {
      console.log("Data  :- ", data);

      const response = await axiosInstance({ method: "POST", url: admin.login_api, data });
      console.log(response, "====response");
      toast.success("Admin log-in success");
      navigate("/admin/admin-dashboard");
    } catch (error) {
      toast.error("Admin log-in failed");
      console.log(error);
    }
  };

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center heading-head">
        <p className={darkMode ? "text-black" : "text-white "}>
          HM.com / <span className='text-danger' style={{ fontWeight: "800" }}>Admin Sign in</span>
        </p>
      </div>
      <div className={darkMode ? "text-black" : "text-white"}>
        <h1 className="text-center" style={{ fontSize: "20px", fontWeight: "bold" }}>Admin Sign in</h1>
      </div>
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-sec">
          <div className="mb-3" style={{ maxWidth: "400px", width: "90%", margin: "auto" }}>
            <label
              htmlFor="email"
              className={`d-block ${darkMode ? "text-black" : "text-white nav-sec-1 fs-10 fw-normal"}`}
            >
              Email:
            </label>
            <input
              type="email"
              {...register("email")}
              id="email"
              name="email"
              className="pass-input w-100 mt-1"
              required
            />
          </div>
          <div className="mb-3 position-relative" style={{ maxWidth: "400px", width: "90%", margin: "auto" }}>
            <label
              htmlFor="password"
              className={`d-block ${darkMode ? "text-black" : "text-white nav-sec-1 fs-10 fw-normal"}`}
            >
              Password:
            </label>
            <input
              type={showPassword ? "text" : "password"}  // Fix: Toggle input type based on showPassword state
              {...register("password")}
              id="password"
              name="password"
              className="pass-input w-100 mt-1"
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
                fontSize: "0.9rem",
                fontWeight: "600",
                color: darkMode ? "black" : "white",
              }}
            >
              {showPassword ? "HIDE" : "SHOW"}
            </span>
          </div>
        </div>
        <div className="text-center mb-4">
          <Link
            to="/admin/admin-forgot-password"
            className={darkMode ? "text-black forgot-password" : "text-white forgot-password"}
          >
            Forgot password?
          </Link>
        </div>
        <div className="d-flex justify-content-center">
          <button className="signin-btn" style={{ maxWidth: "400px", width: "90%", fontWeight: "700" }}>
            Sign in
          </button>
        </div>
        <br />
        <div className="d-flex justify-content-center mt-2">
          <button className="signup-first-btn text-center my-1 w-90"
            style={{
              maxWidth: "400px",
              width: "90%",
              fontWeight: "700",
              backgroundColor: "white"
            }}>
            <Link
              to={admin.signup_route}
              className={darkMode ? "text-black" : "text-black"}
              style={{ textDecoration: "none" }}
            >
              Register Admin
            </Link>
          </button>
        </div>
      </form>
    </>
  );
};

export default AdminLogin;
