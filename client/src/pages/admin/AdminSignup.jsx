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

            const response = await axiosInstance.post("/admin/register-admin", data);
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
            <div className={darkMode ? "text-black" : "text-white"}>
                <h1 className="text-center">Admin Sign Up</h1>
            </div>
            <br />
            <div className={darkMode ? "text-black" : "text-white"}>
                <p className="text-center">
                    Join us as an admin to manage the platform's content and users!
                </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-sec text-center">
                    {/* Name Input */}
                    <label
                        htmlFor="name"
                        className={darkMode ? "text-black" : "text-white nav-sec-1 fs-10 fw-normal"}
                    >
                        Name:
                    </label>
                    <div className="d-flex justify-content-center">
                        <input
                            type="text"
                            {...register("name", { required: "Name is required" })}
                            id="name"
                            name="name"
                            className="pass-input mx-auto my-3"
                            style={{ maxWidth: "400px", width: "90%" }}
                        />
                    </div>
                    <label
                        htmlFor="role"
                        className={darkMode ? "text-black" : "text-white nav-sec-1 fs-10 fw-normal"}
                    >
                        Role:
                    </label>
                    <div className="d-flex justify-content-center">
                        <select
                            {...register("role", { required: "Role is required" })}
                            id="role"
                            name="role"
                            className="pass-input mx-auto my-3"
                            style={{ maxWidth: "400px", width: "90%" }}
                        >
                            <option value="admin">Admin</option>
                            <option value="superAdmin">Super Admin</option>
                        </select>
                    </div>

                    {/* Email Input */}
                    <label
                        htmlFor="email"
                        className={darkMode ? "text-black" : "text-white nav-sec-1 fs-10 fw-normal"}
                    >
                        Email:
                    </label>
                    <div className="d-flex justify-content-center">
                        <input
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            id="email"
                            name="email"
                            className="pass-input mx-auto my-3"
                            style={{ maxWidth: "400px", width: "90%" }}
                        />
                    </div>

                    {/* Mobile Input */}
                    <label
                        htmlFor="mobile"
                        className={darkMode ? "text-black" : "text-white nav-sec-1 fs-10 fw-normal"}
                    >
                        Mobile:
                    </label>
                    <div className="d-flex justify-content-center">
                        <input
                            type="tel"
                            {...register("mobile", { required: "Mobile is required" })}
                            id="mobile"
                            name="mobile"
                            className="pass-input mx-auto my-3"
                            style={{ maxWidth: "400px", width: "90%" }}
                        />
                    </div>

                    {/* Password Input */}
                    <label
                        htmlFor="password"
                        className={darkMode ? "text-black" : "text-white nav-sec-1 fs-10 fw-normal"}
                    >
                        Password:
                    </label>
                    <div className="d-flex justify-content-center">
                        <input
                            type="password"
                            {...register("password", { required: "Password is required" })}
                            id="password"
                            name="password"
                            className="pass-input mx-auto my-3"
                            style={{ maxWidth: "400px", width: "90%" }}
                        />
                    </div>

                    {/* Qualification Input (Optional) */}
                    <label
                        htmlFor="qualification"
                        className={darkMode ? "text-black" : "text-white nav-sec-1 fs-10 fw-normal"}
                    >
                        Qualification (Optional):
                    </label>
                    <div className="d-flex justify-content-center">
                        <input
                            type="text"
                            {...register("qualification")}
                            id="qualification"
                            name="qualification"
                            className="pass-input mx-auto my-3"
                            style={{ maxWidth: "400px", width: "90%" }}
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
                        to="/admin/login"
                        className={darkMode ? "text-black" : "text-white forgot-password"}
                    >
                        Log in
                    </Link>
                </p>
            </div>
        </>
    );
}

export default AdminSignup;
