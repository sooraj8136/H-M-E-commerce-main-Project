import React from 'react'; 
import { useFetch } from '../../hooks/useFetch';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import toast from 'react-hot-toast';
import { Container } from 'react-bootstrap';
import { CiHeadphones } from "react-icons/ci";
import { PiNotePencilLight } from 'react-icons/pi';
import { IoIosArrowForward } from 'react-icons/io';
import { VscLinkExternal } from 'react-icons/vsc';

function SellerProfile() {
  const { darkMode } = useSelector((state) => state.mode);
  const [profileData, , error] = useFetch('/seller/seller-profile');
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post('/seller/seller-logout');
      console.log(response, '====response');
      toast.success('Logout successful');
      navigate('/login');
    } catch (err) {
      toast.error('Logout failed');
      console.error('Logout error:', err.response?.data || err.message);
    }
  };

  return (
    <>
      <div className="heading-head d-flex justify-content-center align-items-center mb-3">
        <p className={darkMode ? "text-black" : "text-white"}>HM.com / <span className="text-danger fw-bold">My Account</span></p>
      </div>
      <div className="heading-head d-flex justify-content-center align-items-center">
        <p className={darkMode ? "text-black" : "text-white"} style={{ fontSize: "30px", fontWeight: "600" }}>My Account</p>
      </div>
      <div className="d-flex justify-content-center align-items-center mb-3">
        <p className={`${darkMode ? "text-black" : "text-white"} responsive-text`} style={{ fontSize: "clamp(12px, 2vw, 15px)", fontWeight: "400", textAlign: "center" }}>You can manage your account and subscriptions here</p>
      </div>
      <Container data-theme={darkMode ? "dark" : "light"}>
        <div className="d-flex justify-content-center flex-column flex-lg-row align-items-center" style={{ gap: "20px" }}>
          <Container data-theme={darkMode ? "dark" : "light"}>
            <div className="d-flex justify-content-center align-items-center mt-4" style={{ position: "relative", width: "100%", flex: "1 1 auto" }}>
              <img src="https://static.independent.co.uk/2023/03/24/10/24091937-0f50c800-9d2d-4d83-8456-c784314ffd1f.jpg" alt="Profile Image" style={{ width: "100%", maxWidth: "600px", objectFit: "cover" }} />
              <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translate(-50%, -20%)", color: "white", textAlign: "center", padding: "10px", width: "90%", maxWidth: "500px" }}>
                <p style={{ fontSize: "18px", fontWeight: "600", marginBottom: "5px", lineHeight: "1.2" }}>Hello our Seller</p>
                <p style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.5" }}>Unleash Your Style</p>
              </div>
            </div>
          </Container>
          <div className="profile-container p-4" style={{ flex: "1 1 auto" }}>
            <div className="m-4">
              <div className="profile-details text-start text-dark">
                <div className="info-section">
                  <p className="label">Name:</p>
                  <h5 className={darkMode ? "text-black" : "text-white info-text"}>{profileData?.name}</h5>
                </div>
                <div className="info-section">
                  <p className="label">Email:</p>
                  <h5 className={darkMode ? "text-black" : "text-white info-text"}>{profileData?.email}</h5>
                </div>
                <div className="info-section">
                  <p className="label">Mobile:</p>
                  <h5 className={darkMode ? "text-black" : "text-white info-text"}>{profileData?.mobile}</h5>
                </div>
              </div>
              <br />
            </div>
            <div className="lines-container">
              <div
                className="edit-nav line-section d-flex align-items-center justify-content-between w-100 my-2"
                style={{ transition: "color 0.3s ease" }}>
                <div className="d-flex align-items-center" style={{ flexGrow: 1 }}>
                  <Link
                    to="/seller/update-seller-profile"
                    className={darkMode ? "text-dark" : "text-light"}
                    style={{ textDecoration: "none", fontWeight: "600", transition: "color 0.3s ease" }}>
                    <PiNotePencilLight
                      size={24}
                      style={{ marginRight: "10px", color: darkMode ? "#000000" : "#ffffff", transition: "color 0.3s ease" }}
                    />
                    Edit my profile
                  </Link>
                </div>
                <IoIosArrowForward
                  className={darkMode ? "text-dark" : "text-light"}
                  style={{ transition: "color 0.3s ease" }}
                />
              </div>

              <hr style={{ width: "100%" }} />
              <div className="edit-nav line-section d-flex align-items-center justify-content-between w-100 my-2">
                <div className="d-flex align-items-center" style={{ flexGrow: 1 }}>
                  <CiHeadphones size={24} style={{ marginRight: "10px", color: darkMode ? "#000000" : "#ffffff" }} />
                  <Link to="/contact" className={darkMode ? "text-dark" : "text-light"} style={{ textDecoration: "none", fontWeight: "600" }}>Contact us</Link>
                </div>
                <IoIosArrowForward size={20} className={darkMode ? "text-dark" : "text-light"} />
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
    </>
  );
}

export default SellerProfile;
