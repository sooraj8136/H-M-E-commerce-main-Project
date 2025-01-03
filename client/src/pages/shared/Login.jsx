import React from "react";
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

const Login = () => {
  const { darkMode } = useSelector((state) => state.mode);

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate()

  const user = {
    login_api: "/user/login",
    profile_route: "/user/profile",
    signup_route: "/signup",
};

  const onSubmit = async (data) => {
    try {
      console.log("Data  :- ",  data);

      const response = await axiosInstance({ method: "POST", url: user.login_api, data });
      console.log(response, "====response");
      toast.success("Log-in success");
      navigate(user.profile_route);
    } catch (error) {
      toast.error("Log-in failed");
      console.log(error);
    }
  };

  return (
    <>
      <div className={darkMode ? "text-black" : "text-white"}>
        <h1 className="text-center">sign in </h1>
      </div>
      <br />
      <div className={darkMode ? "text-black" : "text-white"}>
        <p className="text-center">
          Become a member — don’t miss out on deals, offers, discounts, and bonus vouchers.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-sec text-center">
          <label
            htmlFor="email"
            className={darkMode ? "text-black" : "text-white nav-sec-1 fs-10 fw-normal"}
          >
            Email:
          </label>
          <br />
          <div className="d-flex justify-content-center">
            <input
              type="email"
              {...register("email")}
              id="email"
              name="email"
              className="pass-input mx-auto my-3"
              style={{ maxWidth: "400px", width: "90%" }}
              required
            />
          </div>
          <label
            htmlFor="password"
            className={darkMode ? "text-black" : "text-white nav-sec-1 fs-10 fw-normal"}
          >
            Password:
          </label>
          <div className="d-flex justify-content-center">
            <input
              type="password"
              {...register("password")}
              id="password"
              name="password"
              className="pass-input mx-auto my-3"
              style={{ maxWidth: "400px", width: "90%" }}
              required
            />
          </div>
        </div>
        <div className="text-center mb-4">
          <Link
            to="/forgot-password"
            className={darkMode ? "text-black" : "text-white forgot-password"}>
            Forgot password?
          </Link>
        </div>
        <div className="d-flex justify-content-center">
          <input type="submit" className="bg-black submit-btn" value="Sign in" style={{ maxWidth: "400px", width: "90%" }} />
        </div>
        <br />
      </form>
      <div className="d-flex justify-content-center mt-4">
        <button className="signup-first-btn text-center my-4 w-90" style={{ maxWidth: "400px", width: "90%" }} >
          <Link to={user.signup_route} className={darkMode ? "text-black" : "text-black "} >
            Become a member
          </Link>
        </button>
      </div>
    </>
  );
};

export default Login;


