import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

function UpdateSellerProfile() {
    const { darkMode } = useSelector((state) => state.mode);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        role: "",
        qualification: "",
        storeName: "",
        address: "",
    });

    useEffect(() => {
        const fetchSellerData = async () => {
            try {
                const response = await axiosInstance.get("/seller/get-seller-profile");
                setFormData(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchSellerData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.put("/seller/update-seller-profile", formData);
            toast.success("Profile updated successfully");
            navigate("/seller/profile");
            console.log(response.data);
        } catch (error) {
            toast.error(error.response?.data?.error || "Something went wrong");
            console.error(error);
        }
    };

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center heading-head">
                <p className={darkMode ? "text-black" : "text-white "}>
                    HM.com / My Account / <span className="text-danger" style={{ fontWeight: "800" }}>EDIT MY DETAILS</span>
                </p>
            </div>
            <Container className="text-center">
                <h4 className={darkMode ? "text-dark" : "text-light"}
                    style={{ fontSize: "25px", fontWeight: "700" }}>
                    EDIT MY DETAILS
                </h4>
            </Container>

            <Container className="d-flex justify-content-center">
                <div className="p-4" style={{ maxWidth: "400px", width: "90%" }}>
                    <form onSubmit={handleSubmit} style={{ border: "none", padding: "0" }}>
                        <div className="mb-3">
                            <label className={darkMode ? "text-dark" : "text-light"} htmlFor="name">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    border: "1px solid",
                                    outline: "none",
                                    fontSize: "16px",
                                }}
                            />
                        </div>

                        <div className="mb-3">
                            <label className={darkMode ? "text-dark" : "text-light"} htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    border: "1px solid",
                                    outline: "none",
                                    fontSize: "16px",
                                }}
                            />
                        </div>

                        <div className="mb-3">
                            <label className={darkMode ? "text-dark" : "text-light"} htmlFor="mobile">
                                Mobile
                            </label>
                            <input
                                type="text"
                                id="mobile"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    border: "1px solid",
                                    outline: "none",
                                    fontSize: "16px",
                                }}
                            />
                        </div>

                        <div className="mb-3">
                            <label className={darkMode ? "text-dark" : "text-light"} htmlFor="storeName">
                                Store Name
                            </label>
                            <input
                                type="text"
                                id="storeName"
                                name="storeName"
                                value={formData.storeName}
                                onChange={handleChange}
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    border: "1px solid",
                                    outline: "none",
                                    fontSize: "16px",
                                }}
                            />
                        </div>

                        <div className="mb-3">
                            <label className={darkMode ? "text-dark" : "text-light"} htmlFor="address">
                                Address
                            </label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    border: "1px solid",
                                    outline: "none",
                                    fontSize: "16px",
                                }}
                            />
                        </div>

                        <div className="justify-content-center mt-3">
                            <button className="update-prof-btn" style={{ textDecoration: "none" }}>
                                Save
                            </button>
                        </div>
                    </form>

                    <div className="justify-content-center mt-3">
                        <button className="update-prof-cancel-btn">
                            <Link to="/seller/profile" style={{ textDecoration: "none", color: "inherit" }}>
                                Cancel
                            </Link>
                        </button>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default UpdateSellerProfile;
