import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { Container, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import toast from "react-hot-toast";

const UpdateProfile = () => {
    const { darkMode } = useSelector((state) => state.mode);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
    });

    useEffect(() => {
        setTimeout(() => {
            setFormData({
                name: "",
                email: "",
                mobile: "",
            });
            setLoading(false);
        }, 1000);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name && !formData.email && !formData.mobile) {
            toast.error("At least one field is required to update");
            return;
        }

        try {
            const formDataToSend = new FormData();
            if (formData.name) formDataToSend.append("name", formData.name);
            if (formData.email) formDataToSend.append("email", formData.email);
            if (formData.mobile) formDataToSend.append("mobile", formData.mobile);

            const response = await axiosInstance({
                method: "PUT",
                url: "/user/update-profile",
                data: formDataToSend,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                toast.success("Profile updated successfully!");
                navigate("/user/profile");
            }
        } catch (err) {
            console.error(err);
            toast.error("There was an error updating your profile. Please try again.");
        }
    };



    return (
        <>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center">
                    <Spinner animation="border" variant={darkMode ? "dark" : "light"} />
                    <span className={`ms-3 ${darkMode ? "text-black" : "text-white"}`}>Loading...</span>
                </div>
            ) :
                (
                    <>
                        <div className="container d-flex justify-content-center align-items-center heading-head">
                            <p className={darkMode ? "text-black" : "text-white"} style={{ fontWeight: "600" }}>
                                HM.com / <span className='text-danger' style={{ fontWeight: "700" }}>EDIT MY DETAILS</span>
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
                                <form onSubmit={handleSubmit}>
                                    {["name", "email", "mobile"].map((field) => (
                                        <div className="mb-3" key={field}>
                                            <label className={darkMode ? "text-dark" : "text-light"} htmlFor={field}>
                                                {field.charAt(0).toUpperCase() + field.slice(1)}
                                            </label>
                                            <input
                                                type={field === "email" ? "email" : "text"}
                                                id={field}
                                                name={field}
                                                value={formData[field]}
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
                                    ))}

                                    <div className="text-center mt-3">
                                        <button type="submit" className="update-prof-btn" style={{ textDecoration: "none" }}>
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
                )}
        </>
    );
};

export default UpdateProfile;
