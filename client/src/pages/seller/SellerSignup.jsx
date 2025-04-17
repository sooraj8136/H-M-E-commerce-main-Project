import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

function SellerSignup() {
  const { darkMode } = useSelector((state) => state.mode);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false); 

  const onSubmit = async (data) => {
    try {
      console.log("Data  :- ", data);

      const response = await axiosInstance.post("/seller/register-seller", data);
      console.log(response, "====response");
      toast.success("Seller Sign-up success! Please log in.");
      navigate("/seller/login");
    } catch (error) {
      toast.error("Sign-up failed. Please try again.");
      console.log(error);
    }
  };

  return (
    <>
      <div style={{ maxWidth: "400px", width: "90%", margin: "125px auto 0 auto", textAlign: "left" }}>
        <p className={`login-text ${darkMode ? "text-black" : "text-white"}`} style={{ fontSize: "18px", fontWeight: "700" }}>
          REGISTER SELLER ACCOUNT
        </p>
      </div>
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-sec">
          <div
            className="mb-3"
            style={{ maxWidth: "400px", width: "90%", margin: "auto" }}
          >
            <label
              htmlFor="name"
              className={`d-block ${darkMode ? "text-black" : "text-white"
                } nav-sec-1 fs-10 fw-normal`}
            >
              Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              id="name"
              name="name"
              className="pass-input mx-auto my-1 w-100"
              required
            />
          </div>

          <div
            className="mb-3"
            style={{ maxWidth: "400px", width: "90%", margin: "auto" }}
          >
            <label
              htmlFor="email"
              className={`d-block ${darkMode ? "text-black" : "text-white"
                } nav-sec-1 fs-10 fw-normal`}
            >
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              id="email"
              name="email"
              className="pass-input mx-auto my-1 w-100"
              required
            />
          </div>

          <div
            className="mb-3"
            style={{ maxWidth: "400px", width: "90%", margin: "auto" }}
          >
            <label
              htmlFor="mobile"
              className={`d-block ${darkMode ? "text-black" : "text-white"
                } nav-sec-1 fs-10 fw-normal`}
            >
              Mobile
            </label>
            <input
              type="tel"
              {...register("mobile", { required: "Mobile is required" })}
              id="mobile"
              name="mobile"
              className="pass-input mx-auto my-1 w-100"
              required
            />
          </div>

          <div
            className="mb-3"
            style={{ maxWidth: "400px", width: "90%", margin: "auto" }}
          >
            <label
              htmlFor="storeName"
              className={`d-block ${darkMode ? "text-black" : "text-white"
                } nav-sec-1 fs-10 fw-normal`}
            >
              Store Name
            </label>
            <input
              type="text"
              {...register("storeName", { required: "Store Name is required" })}
              id="storeName"
              name="storeName"
              className="pass-input mx-auto my-1 w-100"
              required
            />
          </div>

          <div
            className="mb-3"
            style={{ maxWidth: "400px", width: "90%", margin: "auto" }}
          >
            <label
              htmlFor="address"
              className={`d-block ${darkMode ? "text-black" : "text-white"
                } nav-sec-1 fs-10 fw-normal`}
            >
              Store Address
            </label>
            <input
              type="text"
              {...register("address", { required: "Address is required" })}
              id="address"
              name="address"
              className="pass-input mx-auto my-1 w-100"
              required
            />
          </div>
          <div
            className="mb-3"
            style={{
              maxWidth: "400px",
              width: "90%",
              margin: "auto",
              position: "relative",
            }}
          >
            <label
              htmlFor="password"
              className={`d-block ${darkMode ? "text-black" : "text-white"
                } nav-sec-1 fs-10 fw-normal`}
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: "Password is required" })}
              id="password"
              name="password"
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
                fontSize: "0.9rem",
                fontWeight: "600",
                color: darkMode ? "black" : "white",
              }}
            >
              {showPassword ? "HIDE" : "SHOW"}
            </span>
          </div>
        </div>

        <div
          className="mb-3"
          style={{ maxWidth: "400px", width: "90%", margin: "auto" }}
        >
          <button className="signup-btn w-100" style={{ maxWidth: "400px" }}>
          SIGN UP
          </button>
        </div>
      </form>

      <div className="d-flex justify-content-center mt-2">
        <p className="text-center">
          <Link
            to="/seller/login"
            className={`login-text {darkMode ? "text-black" : "text-white forgot-password"}`} style={{fontSize:".8rem", color:"black"}}
          >
            BACK TO LOGIN
          </Link>
        </p>
      </div>
    </>
  );
}

export default SellerSignup;
