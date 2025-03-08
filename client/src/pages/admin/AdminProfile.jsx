import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';
import { Container } from 'react-bootstrap';
import { PiNotePencilLight } from 'react-icons/pi';
import { IoIosArrowForward } from 'react-icons/io';
import { VscLinkExternal } from 'react-icons/vsc';

function AdminProfile() {
  const { darkMode } = useSelector((state) => state.mode);
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const response = await axiosInstance({
          method : "GET",
          url: '/admin/admin-profile'
        })
        setProfileData(response.data);
      } catch (error) {
        console.error("Failed to fetch Admin profile:", error);
      }
    };
    fetchAdminProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await axiosInstance({
        method: 'POST',
        url : '/admin/admin-logout'
      })
      toast.success('Logout successful');
      navigate('/login');
    } catch (err) {
      toast.error('Logout failed');
      console.error('Logout error:', err.response?.data || err.message);
    }
  };

  return (
    <Container data-theme={darkMode ? "dark" : "light"}>
      <div className="heading-head d-flex justify-content-center align-items-center mt-5">
        <p className={darkMode ? "text-black" : "text-white"}>
          HM.com / <span className="text-danger fw-bold">Admin Account</span>
        </p>
      </div>
      <div className="heading-head d-flex justify-content-center align-items-center mt-5">
        <p className={darkMode ? "text-black" : "text-white"} style={{ fontSize: "25px", fontWeight: "600" }}>
          Admin Account
        </p>
      </div>
      <div className="d-flex justify-content-center flex-column flex-lg-row align-items-center" style={{ gap: "20px" }}>
        <Container data-theme={darkMode ? "dark" : "light"}>
          <div className="d-flex justify-content-center align-items-center mt-4" style={{ position: "relative", width: "100%", flex: "1 1 auto" }}>
            <img
              src="https://about.hm.com/content/dam/hmabout/groupsite/images/article/2023/august/1008-article-image-1952x1206.jpg/jcr:content/renditions/cq5dam.web.976.603.jpeg"
              style={{ width: "100%", maxWidth: "600px", objectFit: "cover" }}
            />
            <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translate(-50%, -20%)", color: "white", textAlign: "center", padding: "10px", width: "90%", maxWidth: "500px" }}>
              <p style={{ fontSize: "18px", fontWeight: "600", marginBottom: "5px", lineHeight: "1.2" }}>Hello Admin</p>
              <p style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.5" }}>Manage Your Platform</p>
            </div>
          </div>
        </Container>
        <div className="profile-container p-4" style={{ flex: "1 1 auto" }}>
          <div className="profile-details text-start text-dark">
            <div className="info-section d-flex flex-column">
              <p className="label mb-1">Name:</p>
              <h5 className={`info-text ${darkMode ? "text-black" : "text-white"}`} style={{ fontSize: "16px", wordBreak: "break-word" }}>
                {profileData?.data.name}
              </h5>
            </div>
            <div className="info-section d-flex flex-column mt-2">
              <p className="label mb-1">Email:</p>
              <h5 className={`info-text ${darkMode ? "text-black" : "text-white"}`} style={{ fontSize: "16px", wordBreak: "break-word" }}>
                {profileData?.data.email}
              </h5>
            </div>
            <div className="info-section d-flex flex-column mt-2">
              <p className="label mb-1">Mobile:</p>
              <h5 className={`info-text ${darkMode ? "text-black" : "text-white"}`} style={{ fontSize: "16px", wordBreak: "break-word" }}>
                {profileData?.data.mobile}
              </h5>
            </div>
          </div>
          <div className="lines-container">
            <div className="edit-nav line-section d-flex align-items-center justify-content-between my-2">
              <div className="d-flex align-items-center" style={{ flexGrow: 1 }}>
                <Link to="/admin/update-admin-profile" className={darkMode ? "text-dark" : "text-light"} style={{ textDecoration: "none", fontWeight: "600" }}>
                  <PiNotePencilLight size={24} style={{ marginRight: "10px", color: darkMode ? "#000000" : "#ffffff" }} />
                  Edit my profile
                </Link>
              </div>
              <IoIosArrowForward className={darkMode ? "text-dark" : "text-light"} />
            </div>
            <hr style={{ width: "100%" }} />
            <div className="line-section d-flex align-items-center justify-content-between w-100 my-2">
              <div className="d-flex align-items-center" style={{ flexGrow: 1 }}>
                <span className={darkMode ? "text-dark" : "text-light"} style={{ cursor: "pointer", fontWeight: "600" }} onClick={handleLogout}>
                  <VscLinkExternal size={21} style={{ marginRight: "10px", color: darkMode ? "#000000" : "#ffffff" }} />
                  Sign out
                </span>
              </div>
              <IoIosArrowForward className={darkMode ? "text-dark" : "text-light"} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default AdminProfile;
