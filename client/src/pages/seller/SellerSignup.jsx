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
      <div className={darkMode ? "text-black" : "text-white"}>
        <h1 className="text-center">Seller Sign Up</h1>
      </div>
      <br />
      <div className={darkMode ? "text-black" : "text-white"}>  
        <p className="text-center">
          Become a seller and start your business with us today!
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-sec text-center">
          <label
            htmlFor="name"
            className={darkMode ? "text-black" : "text-white nav-sec-1 fs-10 fw-normal"}
          >
            Name:
          </label>
          <div className="d-flex justify-content-center">
            <input
              type="text"
              {...register("name")}
              id="name"
              name="name"
              className="pass-input mx-auto my-3"
              style={{ maxWidth: "400px", width: "90%" }}
              required
            />
          </div>

          <label
            htmlFor="email"
            className={darkMode ? "text-black" : "text-white nav-sec-1 fs-10 fw-normal"}
          >
            Email:
          </label>
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
            htmlFor="mobile"
            className={darkMode ? "text-black" : "text-white nav-sec-1 fs-10 fw-normal"}
          >
            Mobile:
          </label>
          <div className="d-flex justify-content-center">
            <input
              type="tel"
              {...register("mobile")}
              id="mobile"
              name="mobile"
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

          <label
            htmlFor="storeName"
            className={darkMode ? "text-black" : "text-white nav-sec-1 fs-10 fw-normal"}
          >
            Store Name:
          </label>
          <div className="d-flex justify-content-center">
            <input
              type="text"
              {...register("storeName")}
              id="storeName"
              name="storeName"
              className="pass-input mx-auto my-3"
              style={{ maxWidth: "400px", width: "90%" }}
              required
            />
          </div>

          <label
            htmlFor="address"
            className={darkMode ? "text-black" : "text-white nav-sec-1 fs-10 fw-normal"}
          >
            Store Address:
          </label>
          <div className="d-flex justify-content-center">
            <input
              type="text"
              {...register("address")}
              id="address"
              name="address"
              className="pass-input mx-auto my-3"
              style={{ maxWidth: "400px", width: "90%" }}
              required
            />
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <input
            type="submit"
            className="bg-black submit-btn"
            value="Sign Up"
            style={{ maxWidth: "400px", width: "90%" }}
          />
        </div>
        <br />
      </form>

      <div className="d-flex justify-content-center mt-4">
        <p className="text-center">
          Already have an account?&nbsp;
          <Link
            to="/seller/login"
            className={darkMode ? "text-black" : "text-white forgot-password"}>
            Log in
          </Link>
        </p>
      </div>
    </>
  );
}

export default SellerSignup;
