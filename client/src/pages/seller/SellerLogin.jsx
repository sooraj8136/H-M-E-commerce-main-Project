import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

const SellerLogin = () => {
  const { darkMode } = useSelector((state) => state.mode);
  
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();   

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
      <div className={darkMode ? "text-black" : "text-white"}>
        <h1 className="text-center">Seller Sign In</h1>
      </div>
      <br />
      <div className={darkMode ? "text-black" : "text-white"}>
        <p className="text-center">
          Access your seller account and start managing your store today.
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
            to="/seller/forgot-password"
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
        <button className="signup-first-btn text-center my-4 w-90" style={{ maxWidth: "400px", width: "90%" }} >
          <Link to={seller.signup_route} className={darkMode ? "text-black" : "text-black"}>
            Become a seller
          </Link>
        </button>
      </div>
    </>
  );
};

export default SellerLogin;
