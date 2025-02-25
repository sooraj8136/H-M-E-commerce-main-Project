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
            <div className="container  d-flex justify-content-center align-items-center heading-head">
                <p className={darkMode ? "text-black" : "text-white "}>HM.com / <span className='text-danger' style={{
                    fontWeight: "800"
                }}>Admin Register</span> </p>
            </div>
            <br />
            <div className={darkMode ? "text-black" : "text-white"} style={{ fontSize: "15px", fontWeight: "500" }}>
                <p className="text-center">
                    Join us as an admin to manage the platform's content and users!
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
                            htmlFor="role"
                            className={`d-block ${darkMode ? "text-black" : "text-white"} nav-sec-1 fs-10 fw-normal`}
                        >
                            Role:
                        </label>
                        <select
                            {...register("role", { required: "Role is required" })}
                            id="role"
                            name="role"
                            className="pass-input mx-auto my-1 w-100"
                            required
                        >
                            <option value="admin">Admin</option>
                        </select>
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
                            Mobile:
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
                            Qualification:
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
                            Password:
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
                        Sign up
                    </button>
                </div>
            </form>
            <div className="d-flex justify-content-center mt-2">
                <p className="text-center">
                    <Link
                        to="/admin/login"
                        className={darkMode ? "text-black" : "text-white forgot-password"}
                    >
                        Back to sign in
                    </Link>
                </p>
            </div>
        </>
    );
}

export default AdminSignup;
