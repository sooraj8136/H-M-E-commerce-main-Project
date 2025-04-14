import React, { useEffect, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';
import { Container, Spinner } from 'react-bootstrap';
import { CiHeadphones } from "react-icons/ci";
import { PiNotePencilLight } from 'react-icons/pi';
import { VscLinkExternal } from 'react-icons/vsc';
import { AiFillDelete } from "react-icons/ai"; // Import the alternative delete icon

function SellerProfile() {
  const { darkMode } = useSelector((state) => state.mode);
  const [profileData, , error] = useFetch('/seller/seller-profile');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200); 

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post('/seller/seller-logout');
      toast.success('Logout successful');
      navigate('/login');
    } catch (err) {
      toast.error('Logout failed');
      console.error('Logout error:', err.response?.data || err.message);
    }
  };

  // Handle delete account
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your seller account? This action cannot be undone.");
    if (confirmDelete) {
      try {
        const response = await axiosInstance.delete(`/seller/delete-seller/${profileData._id}`);
        toast.success(response?.data?.message || "Account deleted successfully");
        navigate('/login');
      } catch (err) {
        toast.error("Failed to delete account");
        console.error("Delete error:", err.response?.data || err.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ marginTop: '100px' }}>
        <Spinner animation="border" variant={darkMode ? "dark" : "light"} />
        <span className={`ms-3 ${darkMode ? "text-black" : "text-white"}`}>Loading...</span>
      </div>
    );
  }

  return (
    <>
      <div
        className="container d-flex justify-content-start align-items-start heading-head"
        style={{ marginTop: "140px" }}>
        <p className={darkMode ? "text-dark" : "text-white"} style={{ fontSize: "40px", fontWeight: "600" }}>
          SELLER ACCOUNT
        </p>
      </div>
      <Container data-theme={darkMode ? "dark" : "light"}>
        <div className="d-flex justify-content-center flex-column flex-lg-row align-items-center" style={{ gap: "20px" }}>

          {/* Left Side: Profile Content */}
          <div className="profile-container p-4" style={{ flex: "1 1 auto" }}>
            <div className="m-4">
              <div className="profile-details text-start text-dark">
                <div className="info-section">
                  <p className={`label ${darkMode ? "text-black" : "text-white"}`}>Name:</p>
                  <h5 className={darkMode ? "text-black" : "text-white info-text"}>{profileData?.name}</h5>
                </div>
                <div className="info-section">
                  <p className={`label ${darkMode ? "text-black" : "text-white"}`}>Email:</p>
                  <h5 className={darkMode ? "text-black" : "text-white info-text"}>{profileData?.email}</h5>
                </div>
                <div className="info-section">
                  <p className={`label ${darkMode ? "text-black" : "text-white"}`}>Mobile:</p>
                  <h5 className={darkMode ? "text-black" : "text-white info-text"}>{profileData?.mobile}</h5>
                </div>
              </div>
              <br />
            </div>
            <div className="lines-container">
              <div className="edit-nav line-section d-flex align-items-center justify-content-between w-100 my-2">
                <div className="d-flex align-items-center" style={{ flexGrow: 1 }}>
                  <Link
                    to="/seller/update-seller-profile"
                    className={darkMode ? "text-dark" : "text-light"}
                    style={{ textDecoration: "none", fontWeight: "600" }}>
                    <PiNotePencilLight
                      size={24}
                      style={{ marginRight: "10px", color: darkMode ? "#000000" : "#ffffff" }}
                    />
                    EDIT MY PROFILE
                  </Link>
                </div>
              </div>
              <hr style={{ width: "100%" }} />
              <div className="edit-nav line-section d-flex align-items-center justify-content-between w-100 my-2">
                <div className="d-flex align-items-center" style={{ flexGrow: 1 }}>
                  <CiHeadphones size={24} style={{ marginRight: "10px", color: darkMode ? "#000000" : "#ffffff" }} />
                  <Link to="/contact" className={darkMode ? "text-dark" : "text-light"} style={{ textDecoration: "none", fontWeight: "600" }}>CONTACT US</Link>
                </div>
              </div>
              <hr style={{ width: "100%" }} />
              <div className="line-section d-flex align-items-center justify-content-between w-100 my-2">
                <div className="d-flex align-items-center" style={{ flexGrow: 1 }}>
                  <span className={darkMode ? "text-dark" : "text-light"} style={{ cursor: "pointer", fontWeight: "500" }} onClick={handleLogout}>
                    <VscLinkExternal size={21} style={{ marginRight: "10px", color: darkMode ? "#000000" : "#ffffff" }} />
                    SIGN OUT
                  </span>
                </div>
              </div>
              <hr style={{ width: "100%" }} />
            </div>
          </div>
          <Container data-theme={darkMode ? "dark" : "light"}>
            <div className="d-flex justify-content-center align-items-center mt-4" style={{ position: "relative", width: "100%", flex: "1 1 auto" }}>
              <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translate(-50%, -20%)", color: "white", textAlign: "center", padding: "10px", width: "90%", maxWidth: "500px" }}>
              </div>
            </div>
          </Container>
        </div>
      </Container>
    </>
  );
}

export default SellerProfile;
