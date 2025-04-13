import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { Container } from "react-bootstrap";

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

      const response = await axiosInstance({
        method: "POST",
        url: admin.login_api, data
      });
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
      <Container>
        <div className="d-flex justify-content-center">
          <div className={`w-100 ${darkMode ? "text-black" : "text-white"}`} style={{ maxWidth: "400px", textAlign: "left", marginTop: "125px" }}>
            <p style={{ fontSize: "13px", fontWeight: "700", marginTop: "20px" }}>
              ADMIN LOGIN
            </p>
          </div>
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
          <div className="mb-4" style={{ maxWidth: "400px", width: "90%", margin: "10px auto 0 auto", textAlign: "left" }}>
            <Link
              to="/admin/admin-forgot-password"
              className={`${darkMode ? "text-black" : "text-white"} forgot-password no-underline`} style={{ fontSize: "13px", fontWeight: "600" }}
            >
              Forgot password?
            </Link>
          </div>
          <div className="d-flex justify-content-center">
            <button className="signin-btn" style={{ maxWidth: "400px", width: "90%", fontWeight: "500" }}>
              SIGN IN
            </button>
          </div>
          <br />
          <div className="d-flex justify-content-center mt-2">
            <Link
              to={admin.signup_route}
              className={darkMode ? "text-dark" : "text-white"}
              style={{ fontWeight: "600" }}
            >
              REGISTER ADMIN
            </Link>
          </div>
        </form>
      </Container>
    </>
  );
};

export default AdminLogin;
