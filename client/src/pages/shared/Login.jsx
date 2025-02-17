import React, { useState } from "react"; 
import { useForm } from "react-hook-form"; 
import { useSelector } from "react-redux"; 
import { Link, useNavigate } from "react-router-dom"; 
import { axiosInstance } from "../../config/axiosInstance"; 
import toast from "react-hot-toast";

const Login = () => { 
  const { darkMode } = useSelector((state) => state.mode); 
  const { register, handleSubmit } = useForm(); 
  const navigate = useNavigate(); 
  const [showPassword, setShowPassword] = useState(false); 
  const user = { login_api: "/user/login", profile_route: "/user/profile", signup_route: "/signup" };

  const onSubmit = async (data) => { 
    try { 
      console.log("Data  :- ", data); 
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
      <div className="container d-flex justify-content-center align-items-center heading-head"> 
        <p className={darkMode ? "text-black" : "text-white "}> 
          HM.com /{" "} 
          <span className="text-danger" style={{ fontWeight: "800" }}> 
            Login 
          </span> 
        </p> 
      </div> 
      <div className={darkMode ? "text-black" : "text-white"}> 
        <h1 className="text-center" style={{ fontSize: "20px", fontWeight: "bold" }}> 
          sign in{" "} 
        </h1> 
      </div> 
      <br /> 
      <div className={darkMode ? "text-black" : "text-white"} style={{ fontSize: "15px", fontWeight: "500" }}> 
        <p className="text-center"> 
          Become a member — don’t miss out on deals, offers, discounts, and bonus vouchers. 
        </p> 
      </div> 
      <form onSubmit={handleSubmit(onSubmit)}> 
        <div className="input-sec"> 
          <div className="mb-3" style={{ maxWidth: "400px", width: "90%", margin: "auto" }}> 
            <label htmlFor="email" className={`d-block ${darkMode ? "text-black" : "text-white nav-sec-1 fs-10 fw-normal"}`}> 
              Email: 
            </label> 
            <input type="email" {...register("email")} id="email" name="email" className="pass-input w-100 mt-1" required /> 
          </div> 
          <div className="mb-3 position-relative" style={{ maxWidth: "400px", width: "90%", margin: "auto" }}> 
            <label htmlFor="password" className={`d-block ${darkMode ? "text-black" : "text-white nav-sec-1 fs-10 fw-normal"}`}> 
              Password: 
            </label> 
            <input type={showPassword ? "text" : "password"} {...register("password")} id="password" name="password" className="pass-input w-100 mt-1" required /> 
            <span onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: "10px", top: "68%", transform: "translateY(-50%)", cursor: "pointer", fontSize: "0.8rem", fontWeight: '600' }}> 
              {showPassword ? "HIDE" : "SHOW"} 
            </span> 
          </div> 
        </div> 
        <div className="text-center mb-4"> 
          <Link to="/user/user-forgot-password" className={`${darkMode ? "text-black" : "text-white"} forgot-password no-underline`}> 
            Forgot password? 
          </Link> 
        </div> 
        <div className="d-flex justify-content-center"> 
          <button className="bg-black signin-btn" style={{ maxWidth: "400px", width: "90%" }}> 
            Sign in 
          </button> 
        </div> 
      </form> 
      <div className="d-flex justify-content-center mt-3"> 
        <button className="signup-first-btn text-center my-1 w-90" style={{ maxWidth: "400px", width: "90%", fontWeight: "700", backgroundColor: "white" }}> 
          <Link to={user.signup_route} className={darkMode ? "text-black" : "text-black "} style={{ textDecoration: "none" }}> 
            Become an H&M member 
          </Link> 
        </button> 
      </div> 
    </> 
  ); 
};

export default Login;
