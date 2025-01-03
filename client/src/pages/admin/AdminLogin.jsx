import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

const AdminLogin = () => {
  const { darkMode } = useSelector((state) => state.mode);

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const admin = {
    login_api: "/admin/admin-login", 
    profile_route: "/admin/profile", 
    signup_route: "/admin/signup",
  };

  const onSubmit = async (data) => {
    try {
      console.log("Data  :- ", data);

      const response = await axiosInstance({ method: "POST", url: admin.login_api, data });
      console.log(response, "====response");
      toast.success("Admin log-in success");
      navigate(admin.profile_route); 
    } catch (error) {
      toast.error("Admin log-in failed");
      console.log(error);
    }
  };

  return (
    <>
      <div className={darkMode ? "text-black" : "text-white"}>
        <h1 className="text-center">Admin Sign In</h1>
      </div>
      <br />
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
            to="/admin/forgot-password"
            className={darkMode ? "text-black" : "text-white forgot-password"}
          >
            Forgot password?
          </Link>
        </div>
        <div className="d-flex justify-content-center">
          <input type="submit" className="bg-black submit-btn" value="Sign in" style={{ maxWidth: "400px", width: "90%" }} />
        </div>
        <br />
      </form>
      <div className="d-flex justify-content-center mt-4">
        <button className="signup-first-btn text-center my-4 w-90" style={{ maxWidth: "400px", width: "90%" }}>
          <Link to={admin.signup_route} className={darkMode ? "text-black" : "text-black"}>
            Register admin
          </Link>
        </button>
      </div>
    </>
  );
};

export default AdminLogin;



