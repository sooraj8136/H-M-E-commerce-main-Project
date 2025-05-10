import React from 'react';
import { useForm } from "react-hook-form";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

function AdminSignup() {
    const { darkMode } = useSelector((state) => state.mode);

    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            console.log("Data  :- ", data);
            const response = await axiosInstance({
                method: "POST",
                url: '/admin/register-admin', data
            })
            console.log(response, "====response");
            toast.success("Admin Sign-up success! Please log in.");
            navigate("/admin/login");
        } catch (error) {
            toast.error("Sign-up failed. Please try again.");
            console.log(error);
        }
    };

    return (
        <>
            <div style={{ maxWidth: "400px", width: "90%", margin: "125px auto 0 auto", textAlign: "left" }}>
                <p className={`login-text ${darkMode ? "text-black" : "text-white"}`} style={{ fontSize: "18px", fontWeight: "700" }}>
                    ADMIN SIGN UP
                </p>
            </div>
            <br />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-sec">
                    <div className="mb-3" style={{ maxWidth: "400px", width: "90%", margin: "auto" }}>
                        <label
                            htmlFor="name"
                            className={`d-block ${darkMode ? "text-black" : "text-white"} nav-sec-1 fs-10 fw-normal`}
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
                    <div className="mb-3" style={{ maxWidth: "400px", width: "90%", margin: "auto" }}>
                        <label
                            htmlFor="email"
                            className={`d-block ${darkMode ? "text-black" : "text-white"} nav-sec-1 fs-10 fw-normal`}
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
                    <div className="mb-3" style={{ maxWidth: "400px", width: "90%", margin: "auto" }}>
                        <label
                            htmlFor="mobile"
                            className={`d-block ${darkMode ? "text-black" : "text-white"} nav-sec-1 fs-10 fw-normal`}
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
                    <div className="mb-3" style={{ maxWidth: "400px", width: "90%", margin: "auto" }}>
                        <label
                            htmlFor="qualification"
                            className={`d-block ${darkMode ? "text-black" : "text-white"} nav-sec-1 fs-10 fw-normal`}
                        >
                            Qualification
                        </label>
                        <input
                            type="text"
                            {...register("qualification")}
                            id="qualification"
                            name="qualification"
                            className="pass-input mx-auto my-1 w-100"
                        />
                    </div>
                    <div className="mb-3" style={{ maxWidth: "400px", width: "90%", margin: "auto" }}>
                        <label
                            htmlFor="password"
                            className={`d-block ${darkMode ? "text-black" : "text-white"} nav-sec-1 fs-10 fw-normal`}
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            {...register("password", { required: "Password is required" })}
                            id="password"
                            name="password"
                            className="pass-input mx-auto my-1 w-100"
                            required
                        />
                    </div>
                </div>
                <div className="mb-3" style={{ maxWidth: "400px", width: "90%", margin: "auto" }}>
                    <button className="signup-btn w-100" style={{ maxWidth: "400px" }}>
                        SIGN UP
                    </button>
                </div>
            </form>
            <div className="d-flex justify-content-center mt-2">
                <p className="text-center">
                    <Link
                        to="/admin/login"
                        className={`login-text {darkMode ? "text-black" : "text-white forgot-password"}`} style={{fontSize:".8rem", color:"black"}}
                    >
                        BACK TO SIGN IN
                    </Link>
                </p>
            </div>
        </>
    );
}

export default AdminSignup;
