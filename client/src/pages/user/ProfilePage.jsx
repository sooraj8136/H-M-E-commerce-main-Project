import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Spinner, Modal } from 'react-bootstrap';
import { IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { PiCubeLight, PiNotePencilLight } from "react-icons/pi";
import { VscLinkExternal, VscTrash } from "react-icons/vsc";
import { CiHeadphones } from "react-icons/ci";
import { axiosInstance } from '../../config/axiosInstance';

function ProfilePage() {
  const { darkMode } = useSelector((state) => state.mode);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axiosInstance.get("/user/profile");
        setTimeout(() => {
          setProfileData(response?.data?.data);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/user/logout");
      toast.success("Logout success");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/user/delete-user/${profileData._id}`);
      toast.success("Your Account has been deleted");
      navigate("/login");
    } catch (error) {
      toast.error("Account deletion failed");
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" variant={darkMode ? "dark" : "light"} />
          <span className={`ms-3 ${darkMode ? "text-black" : "text-white"}`}>Loading...</span>
        </div>
      ) : (
        <>
          <div className="container d-flex justify-content-center align-items-center heading-head">
            <p className={darkMode ? "text-black" : "text-white"} style={{ fontWeight: "600" }}>
              HM.com / <span className='text-danger' style={{ fontWeight: "700" }}>My Account</span>
            </p>
          </div>

          <div className="heading-head d-flex justify-content-center align-items-center">
            <p className={darkMode ? "text-black" : "text-white"} style={{ fontSize: "30px", fontWeight: "600" }}>My Account</p>
          </div>

          <div className="d-flex justify-content-center align-items-center mb-3">
            <p className={`${darkMode ? "text-black" : "text-white"} responsive-text`} style={{ fontSize: "clamp(12px, 2vw, 15px)", fontWeight: "400", textAlign: "center" }}>
              You can manage your account and subscriptions here
            </p>
          </div>
          <Container data-theme={darkMode ? "dark" : "light"}>
            <div className="d-flex justify-content-center flex-column flex-lg-row align-items-center" style={{ gap: "20px" }}>
              <Container data-theme={darkMode ? "dark" : "light"}>
                <div className="d-flex justify-content-center align-items-center mt-4" style={{ position: "relative", width: "100%", flex: "1 1 auto" }}>
                  <img
                    src="https://media.glamour.com/photos/57a889e4829583e04a823278/master/w_1600%2Cc_limit/katy-syme-hm.jpeg"
                    alt="Profile"
                    style={{ width: "100%", maxWidth: "600px", objectFit: "cover" }}
                  />
                  <div style={{
                    position: "absolute", top: "20%", left: "50%",
                    transform: "translate(-50%, -20%)", color: "white",
                    textAlign: "center", padding: "10px",
                    width: "90%", maxWidth: "500px"
                  }}>
                    <p style={{ fontSize: "18px", fontWeight: "600", marginBottom: "5px", lineHeight: "1.2" }}>Hello Member</p>
                    <p style={{ fontSize: "14px", fontWeight: "400", lineHeight: "1.5" }}>
                      Exclusive offers<br />
                      Curated inspiration<br />
                      New drops, collection unveilings, and much more
                    </p>
                  </div>
                </div>
              </Container>
              <div className="profile-container p-4" style={{ flex: "1 1 auto" }}>
                <div className="m-4">
                  <div className="profile-details text-start text-dark">
                    <div className="info-section">
                      <p className="label">Name:</p>
                      <h5 className={darkMode ? "text-black" : "text-white info-text"} style={{ fontSize: "1rem" }}>{profileData?.name}</h5>
                    </div>
                    <div className="info-section">
                      <p className="label">Email:</p>
                      <h5 className={darkMode ? "text-black" : "text-white info-text"} style={{ fontSize: "1rem" }}>{profileData?.email}</h5>
                    </div>
                    <div className="info-section">
                      <p className="label">Mobile:</p>
                      <h5 className={darkMode ? "text-black" : "text-white info-text"} style={{ fontSize: "1rem" }}>{profileData?.mobile}</h5>
                    </div>
                  </div>
                </div>
                <div className="lines-container">
                  <div className="edit-nav line-section d-flex align-items-center justify-content-between w-100 my-2">
                    <div className="d-flex align-items-center" style={{ flexGrow: 1 }}>
                      <Link to="/user/orders" className={darkMode ? "text-dark" : "text-light"} style={{ textDecoration: "none", fontWeight: "600", display: "flex", alignItems: "center", marginRight: "120px" }}>
                        <PiCubeLight size={24} style={{ marginRight: "10px", color: darkMode ? "#000000" : "#ffffff" }} />
                        Orders
                      </Link>
                    </div>
                    <IoIosArrowForward className={darkMode ? "text-dark" : "text-light"} />
                  </div>
                  <hr />
                  <div className="edit-nav line-section d-flex align-items-center justify-content-between w-100 my-2">
                    <div className="d-flex align-items-center" style={{ flexGrow: 1 }}>
                      <Link to="/user/update-user-profile" className={darkMode ? "text-dark" : "text-light"} style={{ textDecoration: "none", fontWeight: "600" }}>
                        <PiNotePencilLight size={24} style={{ marginRight: "10px", color: darkMode ? "#000000" : "#ffffff" }} />
                        Edit my profile
                      </Link>
                    </div>
                    <IoIosArrowForward className={darkMode ? "text-dark" : "text-light"} />
                  </div>
                  <hr />
                  <div className="edit-nav line-section d-flex align-items-center justify-content-between w-100 my-2">
                    <div className="d-flex align-items-center" style={{ flexGrow: 1 }}>
                      <CiHeadphones size={24} style={{ marginRight: "10px", color: darkMode ? "#000000" : "#ffffff" }} />
                      <Link to="/contact" className={darkMode ? "text-dark" : "text-light"} style={{ textDecoration: "none", fontWeight: "600" }}>Contact us</Link>
                    </div>
                    <IoIosArrowForward className={darkMode ? "text-dark" : "text-light"} />
                  </div>
                  <hr />
                  <div className="line-section d-flex align-items-center justify-content-between w-100 my-2">
                    <div className="d-flex align-items-center" style={{ flexGrow: 1 }}>
                      <span className={darkMode ? "text-dark" : "text-light"} style={{ cursor: "pointer", fontWeight: "600" }} onClick={() => setShowConfirmModal(true)}>
                        <VscTrash size={21} style={{ marginRight: "10px", color: darkMode ? "#000000" : "#ffffff" }} />
                        Delete Account
                      </span>
                    </div>
                    <IoIosArrowForward className={darkMode ? "text-dark" : "text-light"} />
                  </div>
                  <hr />
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
          <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete your account?
            </Modal.Body>
            <Modal.Footer>
              <button
                style={{ backgroundColor: "black", border: "none", color: "white", fontSize: "0.9rem", padding: "6px 12px" }}
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </button>
              <button
                style={{ backgroundColor: "black", border: "none", color: "white", fontSize: "0.9rem", padding: "6px 12px" }}
                onClick={() => {
                  setShowConfirmModal(false);
                  handleDelete();
                }}
              >
                Delete
              </button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
}

export default ProfilePage;
