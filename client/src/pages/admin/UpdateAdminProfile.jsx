import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

const UpdateAdminProfile = () => {
    const { darkMode } = useSelector((state) => state.mode);
    const navigate = useNavigate();
    const [adminData, setAdminData] = useState({
        name: "",
        email: "",
        mobile: "",
        qualification: "",
    });

    useEffect(() => {
        const fetchAdminProfile = async () => {
            try {
                const response = await axiosInstance({
                    method: "GET",
                    url: "/admin/admin-profile"
                });
                setAdminData(response.data);
            } catch (error) {
                toast.error("Failed to fetch admin profile");
            }
        };
        fetchAdminProfile();
    }, []);

    const handleChange = (e) => {
        setAdminData({ ...adminData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance({
                method: "PUT",
                url: "/admin/update-admin-profile", 
                data: adminData
            });
            toast.success("Profile updated successfully");
            navigate("/admin/admin-profile");
        } catch (error) {
            toast.error(error.response?.data?.error || "Something went wrong");
        }
    };

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center heading-head">
                <p className={darkMode ? "text-black" : "text-white"}>
                    HM.com / My Account / <span className="text-danger" style={{ fontWeight: "800" }}>EDIT MY DETAILS</span>
                </p>
            </div>
            <Container className="text-center">
                <h4 className={darkMode ? "text-dark" : "text-light"} style={{ fontSize: "25px", fontWeight: "700" }}>
                    EDIT MY DETAILS
                </h4>
            </Container>

            <Container className="d-flex justify-content-center">
                <div className="p-4" style={{ maxWidth: "400px", width: "90%" }}>
                    <form onSubmit={handleSubmit} style={{ border: "none", padding: "0" }}>
                        <div className="mb-3">
                            <label className={darkMode ? "text-dark" : "text-light"} htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" value={adminData.name} onChange={handleChange} style={{ width: "100%", padding: "10px", border: "1px solid", outline: "none", fontSize: "16px" }} />
                        </div>

                        <div className="mb-3">
                            <label className={darkMode ? "text-dark" : "text-light"} htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" value={adminData.email} onChange={handleChange} style={{ width: "100%", padding: "10px", border: "1px solid", outline: "none", fontSize: "16px" }} />
                        </div>

                        <div className="mb-3">
                            <label className={darkMode ? "text-dark" : "text-light"} htmlFor="mobile">Mobile</label>
                            <input type="text" id="mobile" name="mobile" value={adminData.mobile} onChange={handleChange} style={{ width: "100%", padding: "10px", border: "1px solid", outline: "none", fontSize: "16px" }} />
                        </div>

                        <div className="mb-3">
                            <label className={darkMode ? "text-dark" : "text-light"} htmlFor="qualification">Qualification</label>
                            <input type="text" id="qualification" name="qualification" value={adminData.qualification} onChange={handleChange} style={{ width: "100%", padding: "10px", border: "1px solid", outline: "none", fontSize: "16px" }} />
                        </div>

                        <div className="justify-content-center mt-3">
                            <button className="update-prof-btn" style={{ textDecoration: "none" }}>Save</button>
                        </div>
                    </form>

                    <div className="justify-content-center mt-3">
                        <button className="update-prof-cancel-btn">
                            <Link to="/admin/admin-profile" style={{ textDecoration: "none", color: "inherit" }}>Cancel</Link>
                        </button>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default UpdateAdminProfile;
