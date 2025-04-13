import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";
import { Container } from "react-bootstrap";

const SellerLogin = () => {
  const { darkMode } = useSelector((state) => state.mode);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const seller = {
    login_api: "/seller/login-seller",
    profile_route: "/seller/seller-home",
    signup_route: "/seller/signup",
  };

  const onSubmit = async (data) => {
    try {
      console.log("Data  :- ", data);

      const response = await axiosInstance({ method: "POST", url: seller.login_api, data });
      console.log(response, "====response");
      toast.success("Seller log-in success");
      navigate(seller.profile_route);
    } catch (error) {
      toast.error("Seller log-in failed");
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <div className="d-flex justify-content-center">
          <div className={`w-100 ${darkMode ? "text-black" : "text-white"}`} style={{ maxWidth: "400px", textAlign: "left", marginTop: "125px" }}>
            <p style={{ fontSize: "13px", fontWeight: "700", marginTop: "20px" }}>
              SELLER LOGIN
            </p>
          </div>
        </div>
        <br />
        <div className="d-flex justify-content-center">
          <div className={`w-100 ${darkMode ? "text-black" : "text-white"}`} style={{ maxWidth: "400px", textAlign: "left" }}>
            <p style={{ fontSize: "13px", fontWeight: "700" }}>
              ACCESS YOUR SELLER ACCOUNT AND START MANAGING YOUR STORE TODAY.
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-sec">
            <div
              className="mb-3"
              style={{ maxWidth: "400px", width: "90%", margin: "auto" }}
            >
              <label
                htmlFor="email"
                className={`d-block ${darkMode
                  ? "text-black"
                  : "text-white nav-sec-1 fs-10 fw-normal"
                  }`}
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
            <div
              className="mb-3"
              style={{ maxWidth: "400px", width: "90%", margin: "auto", position: "relative" }}
            >
              <label
                htmlFor="password"
                className={`d-block ${darkMode
                  ? "text-black"
                  : "text-white nav-sec-1 fs-10 fw-normal"
                  }`}
              >
                Password:
              </label>
              <input
                type={showPassword ? "text" : "password"}
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
              to="/seller/seller-forgot-password"
              className={`${darkMode ? "text-black" : "text-white"} forgot-password no-underline`} style={{ fontSize: "13px", fontWeight: "600" }}
            >
              Forgot password?
            </Link>
          </div>
          <div className="d-flex justify-content-center">
            <button
              className="bg-black signin-btn"
              style={{ maxWidth: "400px", width: "90%" }}
            >
              SIGN IN
            </button>
          </div>
          <br />
        </form>
        <div className="d-flex justify-content-center mt-2">
          <Link
            to={seller.signup_route}
            className={darkMode ? "text-black" : "text-black"}
          >
            BECOME AN S&M SELLER
          </Link>
        </div>
      </Container>
    </>
  );
};

export default SellerLogin;
