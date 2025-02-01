import React from 'react';
import { useForm } from "react-hook-form";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

function SellerSignup() {

  const { darkMode } = useSelector((state) => state.mode);

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

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
      <div className="container  d-flex justify-content-center align-items-center heading-head">
        <p className={darkMode ? "text-black" : "text-white "}>HM.com / <span className='text-danger' style={{
          fontWeight: "800"
        }}>Seller Register</span> </p>
      </div>
      <br />
      <div className={darkMode ? "text-black" : "text-white"} style={{ fontSize: "15px", fontWeight: "500" }}>
        <p className="text-center">
          Become a seller and start your business with us today!
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-sec">
          <div className="mb-3" style={{ maxWidth: "400px", width: "90%", margin: "auto" }}>
            <label
              htmlFor="name"
              className={`d-block ${darkMode ? "text-black" : "text-white"} nav-sec-1 fs-10 fw-normal`}
            >
              Name:
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

          <div className="mb-3" style={{ maxWidth: "400px", width: "90%", margin: "auto" }}>
            <label
              htmlFor="email"
              className={`d-block ${darkMode ? "text-black" : "text-white"} nav-sec-1 fs-10 fw-normal`}
            >
              Email:
            </label>
            <input
              type="email"
              {...register("email", { required: "Name is required" })}
              id="email"
              name="email"
              className="pass-input mx-auto my-1 w-100"
              required
            />
          </div>

          <div className="mb-3" style={{ maxWidth: "400px", width: "90%", margin: "auto" }}>
            <label
              htmlFor="mobile"
              className={`d-block ${darkMode ? "text-black" : "text-white"} nav-sec-1 fs-10 fw-normal`}
            >
              Mobile:
            </label>
            <input
              type="tel"
              {...register("mobile", { required: "Name is required" })}
              id="mobile"
              name="mobile"
              className="pass-input mx-auto my-1 w-100"
              style={{ maxWidth: "400px", width: "90%" }}
              required
            />
          </div>

          <div className="mb-3" style={{ maxWidth: "400px", width: "90%", margin: "auto" }}>
            <label
              htmlFor="password"
              className={`d-block ${darkMode ? "text-black" : "text-white"} nav-sec-1 fs-10 fw-normal`}
            >
              Password:
            </label>
            <input
              type="password"
              {...register("password", { required: "Name is required" })}
              id="password"
              name="password"
              className="pass-input mx-auto my-1 w-100"
              required
            />
          </div>

          <div className="mb-3" style={{ maxWidth: "400px", width: "90%", margin: "auto" }}>
            <label
              htmlFor="storeName"
              className={`d-block ${darkMode ? "text-black" : "text-white"} nav-sec-1 fs-10 fw-normal`}
            >
              Store Name:
            </label>
            <input
              type="text"
              {...register("storeName", { required: "Name is required" })}
              id="storeName"
              name="storeName"
              className="pass-input mx-auto my-1 w-100"
              required
            />
          </div>

          <div className="mb-3" style={{ maxWidth: "400px", width: "90%", margin: "auto" }}>
            <label
              htmlFor="address"
              className={`d-block ${darkMode ? "text-black" : "text-white"} nav-sec-1 fs-10 fw-normal`}
            >
              Store Address:
            </label>
            <input
              type="text"
              {...register("address", { required: "Name is required" })}
              id="address"
              name="address"
              className="pass-input mx-auto my-1 w-100"
              required
            />
          </div>
        </div>

        <div className="mb-3" style={{ maxWidth: "400px", width: "90%", margin: "auto" }}>
          <button className="signup-btn w-100" style={{ maxWidth: "400px" }}>
            Sign up
          </button>
        </div>
      </form>

      <div className="d-flex justify-content-center mt-2">
        <p className="text-center">
          <Link
            to="/seller/login"
            className={darkMode ? "text-black" : "text-white forgot-password"}>
            Back to sign in
          </Link>
        </p>
      </div>
    </>
  );
}

export default SellerSignup;
