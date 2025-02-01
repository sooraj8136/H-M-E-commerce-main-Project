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
      <div className="container  d-flex justify-content-center align-items-center heading-head">
        <p className={darkMode ? "text-black" : "text-white "}>HM.com / <span className='text-danger' style={{
          fontWeight: "800"
        }}>seller login</span> </p>
      </div>
      <div className={darkMode ? "text-black" : "text-white"}>
        <h1 className="text-center"
          style={{ fontSize: "20px", fontWeight: "bold" }}>Seller Sign in </h1>
      </div>
      <br />
      <div className={darkMode ? "text-black" : "text-white"} style={{ fontSize: "15px", fontWeight: "500" }}>
        <p className="text-center">
          Access your seller account and start managing your store today.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-sec">
          <div className="mb-3" style={{ maxWidth: "400px", width: "90%", margin: "auto" }}>
            <label
              htmlFor="email"
              className={`d-block ${darkMode ? "text-black" : "text-white nav-sec-1 fs-10 fw-normal"}`}>
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
          <div className="mb-3" style={{ maxWidth: "400px", width: "90%", margin: "auto" }}>
            <label
              htmlFor="password"
              className={`d-block ${darkMode ? "text-black" : "text-white nav-sec-1 fs-10 fw-normal"}`}>
              Password:
            </label>
            <input
              type="password"
              {...register("password")}
              id="password"
              name="password"
              className="pass-input w-100 mt-1"
              required
            />
          </div>
        </div>
        <div className="text-center mb-4">
          <Link
            to="/seller/seller-forgot-password"
            className={`${darkMode ? "text-black" : "text-white"} forgot-password no-underline`}
          >
            Forgot password?
          </Link>
        </div>
        <div className="d-flex justify-content-center">
          <button className="bg-black signin-btn" style={{ maxWidth: "400px", width: "90%" }}>
            Sign in
          </button>
        </div>
        <br />
      </form>
      <div className="d-flex justify-content-center mt-2">
        <button className="signup-first-btn text-center my-1 w-90" style={{ maxWidth: "400px", width: "90%", fontWeight: "700", backgroundColor: "white" }} >
          <Link to={seller.signup_route} className={darkMode ? "text-black" : "text-black"}
            style={{ textDecoration: "none" }}
          >
            Become an H&M seller
          </Link>
        </button>
      </div>
    </>
  );
};

export default SellerLogin;
