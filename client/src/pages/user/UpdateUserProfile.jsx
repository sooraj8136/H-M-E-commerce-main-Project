import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

const UpdateProfile = () => {
    const { darkMode } = useSelector((state) => state.mode);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        profilePic: null,
    });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        setFormData({
            name: "",
            email: "",
            mobile: "",
            profilePic: null,
        });
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prevData) => ({
                ...prevData,
                profilePic: file, 
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name && !formData.email && !formData.mobile && !formData.profilePic) {
            toast.error(error?.response?.data?.message || "At least one field (name, email, mobile, or profile picture) is required to update");
            setError("At least one field (name, email, mobile, or profile picture) is required to update");
            setMessage(""); 
            return;
        }

        try {
            const formDataToSend = new FormData();
            if (formData.name) formDataToSend.append("name", formData.name);
            if (formData.email) formDataToSend.append("email", formData.email);
            if (formData.mobile) formDataToSend.append("mobile", formData.mobile);
            if (formData.profilePic) {
                formDataToSend.append("profilePic", formData.profilePic);
            }

            const response = await axiosInstance.put('/user/update-profile', formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                toast.success("Profile updated successfully!");
                setError(""); // Clear previous errors
                navigate("/user/profile")
            }
        } catch (err) {
            console.error(err);
            toast.error(error?.response?.data?.message || "There was an error updating your profile. Please try again.");
            setError("There was an error updating your profile. Please try again.");
            setMessage(""); 
        }
    };

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center heading-head">
                <p className={darkMode ? "text-black" : "text-white "}>HM.com / <span className='text-danger' style={{
                    fontWeight: "800"
                }}>EDIT MY DETAILS</span> </p>
            </div>
            <Container className="text-center">
                <h4 className={darkMode ? "text-dark" : "text-light"}>EDIT MY DETAILS</h4>
            </Container>

            <Container className="d-flex justify-content-center">
                <div className="p-4" style={{ maxWidth: "400px", width: "90%" }}>
                    <form onSubmit={handleSubmit} style={{ border: "none", padding: "0" }}>
                        <div className="mb-3">
                            <label className={darkMode ? "text-dark" : "text-light"} htmlFor="name">Name</label>
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
                            <label className={darkMode ? "text-dark" : "text-light"} htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    border: "1px solid ",
                                    outline: "none",
                                    fontSize: "16px",
                                }}
                            />
                        </div>

                        <div className="mb-3">
                            <label className={darkMode ? "text-dark" : "text-light"} htmlFor="mobile">Mobile</label>
                            <input
                                type="text"
                                id="mobile"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    border: "1px solid ",
                                    outline: "none",
                                    fontSize: "16px",
                                }}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="profilePic">Profile Picture</label>
                            <input
                                type="file"
                                id="profilePic"
                                accept="image/*"
                                onChange={handleFileChange}
                                style={{
                                    width: "100%",
                                    padding: "10px",
                                    border: "1px solid ",
                                    outline: "none",
                                }}
                            />
                            {/* Display the selected image as a round preview */}
                            {formData.profilePic && (
                                <div style={{ marginTop: "10px", textAlign: "center" }}>
                                    <img
                                        src={URL.createObjectURL(formData.profilePic)} // Display image from the file object
                                        alt="Profile Preview"
                                        style={{
                                            width: "100px", // Set width
                                            height: "100px", // Set height
                                            objectFit: "cover", // Ensure image covers the area
                                            borderRadius: "50%", // Make the image round
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="justify-content-center mt-3">
                            <button className="update-prof-btn" style={{ textDecoration: "none" }}>
                                Save
                            </button>
                        </div>
                    </form>

                    <div className="justify-content-center mt-3">
                        <button className="update-prof-cancel-btn">
                            <Link to="/user/profile" style={{ textDecoration: "none", color: "inherit" }}>
                                Cancel
                            </Link>
                        </button>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default UpdateProfile;
