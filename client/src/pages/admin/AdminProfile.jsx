import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';
import { Container, Spinner } from 'react-bootstrap';
import { PiNotePencilLight } from 'react-icons/pi'; // Importing the Edit icon
import { VscLinkExternal } from 'react-icons/vsc'; // Importing the Sign out icon

function AdminProfile() {
  const { darkMode } = useSelector((state) => state.mode);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const response = await axiosInstance({
          method: "GET",
          url: '/admin/admin-profile'
        });
        setProfileData(response.data);
      } catch (error) {
        console.error("Failed to fetch Admin profile:", error);
      } finally {
        setTimeout(() => setLoading(false), 1000); // Simulate loading delay
      }
    };
    fetchAdminProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await axiosInstance({
        method: 'POST',
        url: '/admin/admin-logout'
      });
      toast.success('Logout successful');
      navigate('/login');
    } catch (err) {
      toast.error('Logout failed');
      console.error('Logout error:', err.response?.data || err.message);
    }
  };

  return (
    <Container data-theme={darkMode ? "dark" : "light"}>
      <div className="container d-flex justify-content-start align-items-start heading-head" style={{ marginTop: "120px" }}>
        <p className={darkMode ? "text-dark" : "text-white"} style={{ fontSize: "40px", fontWeight: "600" }}>
          ADMIN ACCOUNT
        </p>
      </div>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ marginTop: '50px' }}>
          <Spinner animation="border" variant={darkMode ? "dark" : "light"} />
          <span className={`ms-3 ${darkMode ? "text-black" : "text-white"}`}>Loading...</span>
        </div>
      ) : (
        <div className="d-flex flex-column flex-lg-row justify-content-center align-items-start" style={{ gap: "20px" }}>
          <div className="profile-container p-4" style={{ flex: "1 1 auto", maxWidth: "450px" }}>
            <div className="profile-details text-start text-dark">
              <div className="info-section d-flex flex-column">
                <p className={`label mb-1 ${darkMode ? "text-black" : "text-white"}`} >NAME:</p>
                <h5 className={`info-text ${darkMode ? "text-black" : "text-white"}`} style={{ fontSize: "16px", wordBreak: "break-word" }}>
                  {profileData?.data.name}
                </h5>
              </div>
              <div className="info-section d-flex flex-column mt-2">
                <p className={`label mb-1 ${darkMode ? "text-black" : "text-white"}`}>EMAIL:</p>
                <h5 className={`info-text ${darkMode ? "text-black" : "text-white"}`} style={{ fontSize: "16px", wordBreak: "break-word" }}>
                  {profileData?.data.email}
                </h5>
              </div>
              <div className="info-section d-flex flex-column mt-2">
                <p className={`label mb-1 ${darkMode ? "text-black" : "text-white"}`}>MOBILE:</p>
                <h5 className={`info-text ${darkMode ? "text-black" : "text-white"}`} style={{ fontSize: "16px", wordBreak: "break-word" }}>
                  {profileData?.data.mobile}
                </h5>
              </div>
            </div>

            <div className="lines-container mt-4">
              <div className="edit-nav line-section d-flex align-items-center justify-content-between w-100 my-2">
                <div className="d-flex align-items-center" style={{ flexGrow: 1 }}>
                  <Link to="/admin/update-admin-profile" className={darkMode ? "text-dark" : "text-light"} style={{ textDecoration: "none", fontWeight: "600" }}>
                    <PiNotePencilLight size={24} style={{ marginRight: "10px", color: darkMode ? "#000000" : "#ffffff" }} />
                    EDIT MY PROFILE
                  </Link>
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
            </div>
          </div>

          <Container data-theme={darkMode ? "dark" : "light"} className="mt-4" style={{ flex: "1 1 auto" }}>
            <div className="d-flex justify-content-center align-items-center" style={{ position: "relative", width: "100%" }}>
              <div style={{
                position: "absolute",
                top: "20%",
                left: "50%",
                transform: "translate(-50%, -20%)",
                color: "white",
                textAlign: "center",
                padding: "10px",
                width: "90%",
                maxWidth: "500px"
              }} />
            </div>
          </Container>
        </div>
      )}
    </Container>
  );
}

export default AdminProfile;
