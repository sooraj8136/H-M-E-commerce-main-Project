import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Spinner, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
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
        <div className="d-flex justify-content-center align-items-center" style={{ marginTop: "180px" }}>
          <Spinner animation="border" variant={darkMode ? "dark" : "light"} />
          <span className={`ms-3 ${darkMode ? "text-black" : "text-white"}`}>Loading...</span>
        </div>
      ) : (
        <>
          <div className="container d-flex justify-content-start align-items-start heading-head" style={{ marginTop: "140px" }}>
            <p className={darkMode ? "text-dark" : "text-white"} style={{ fontSize: "40px", fontWeight: "600" }}>USER ACCOUNT</p>
          </div>
          <div className="container d-flex justify-content-start align-items-start heading-head">
            <p className={darkMode ? "text-dark" : "text-white"} style={{ fontSize: "clamp(12px, 2vw, 15px)", fontWeight: "400" }}>
              YOU CAN MANAGE YOUR ACCOUNT AND SUBSCRIPTION HERE
            </p>
          </div>
          <Container data-theme={darkMode ? "dark" : "light"}>
            <div className="d-flex justify-content-start align-items-start flex-column flex-lg-row" style={{ gap: "20px", marginTop: "30px" }}>
              
              {/* Left Section - Profile Information */}
              <div className="profile-container p-4" style={{ flex: "1 1 auto", width: "100%", maxWidth: "600px" }}>
                <div className="m-4">
                  <div className="profile-details text-start text-dark">
                    <div className="info-section">
                      <p className="label">NAME:</p>
                      <h5 className={darkMode ? "text-black" : "text-white info-text"} style={{ fontSize: "1rem" }}>{profileData?.name}</h5>
                    </div>
                    <div className="info-section">
                      <p className="label">EMAIL:</p>
                      <h5 className={darkMode ? "text-black" : "text-white info-text"} style={{ fontSize: "1rem" }}>{profileData?.email}</h5>
                    </div>
                    <div className="info-section">
                      <p className="label">MOBILE:</p>
                      <h5 className={darkMode ? "text-black" : "text-white info-text"} style={{ fontSize: "1rem" }}>{profileData?.mobile}</h5>
                    </div>
                  </div>
                </div>
                <div className="lines-container">
                  <div className="edit-nav line-section d-flex align-items-center justify-content-between w-100 my-2">
                    <div className="d-flex align-items-center" style={{ flexGrow: 1 }}>
                      <Link to="/user/orders" className={darkMode ? "text-dark" : "text-light"} style={{ textDecoration: "none", fontWeight: "600", display: "flex", alignItems: "center",fontSize:".9rem"  }}>
                        ORDERS
                      </Link>
                    </div>
                  </div>
                  <hr />
                  <div className="edit-nav line-section d-flex align-items-center justify-content-between w-100 my-2">
                    <div className="d-flex align-items-center" style={{ flexGrow: 1 }}>
                      <Link to="/user/update-user-profile" className={darkMode ? "text-dark" : "text-light"} style={{ textDecoration: "none", fontWeight: "600", fontSize:".9rem"  }}>
                        EDIT MY PROFILE
                      </Link>
                    </div>
                  </div>
                  <hr />
                  <div className="edit-nav line-section d-flex align-items-center justify-content-between w-100 my-2">
                    <div className="d-flex align-items-center" style={{ flexGrow: 1 }}>
                      <Link to="/contact" className={darkMode ? "text-dark" : "text-light"} style={{ textDecoration: "none", fontWeight: "600",fontSize:".9rem"  }}>
                        CONTACT US
                      </Link>
                    </div>
                  </div>
                  <hr />
                  <div className="line-section d-flex align-items-center justify-content-between w-100 my-2">
                    <div className="d-flex align-items-center" style={{ flexGrow: 1,fontSize:".9rem"  }}>
                      <span  style={{ cursor: "pointer", fontWeight: "600",  color:"#970000"}} onClick={() => setShowConfirmModal(true)}>
                        DELETE ACCOUNT
                      </span>
                    </div>
                  </div>
                  <hr />
                  <div className="line-section d-flex align-items-center justify-content-between w-100 my-2">
                    <div className="d-flex align-items-center" style={{ flexGrow: 1,fontSize:".9rem"  }}>
                      <span className={darkMode ? "text-dark" : "text-light"} style={{ cursor: "pointer", fontWeight: "400" }} onClick={handleLogout}>
                        SIGN OUT
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section - Promotional Section */}
              <div className="d-flex justify-content-center align-items-center mt-4" style={{ position: "relative", flex: "1 1 auto" }}>
                <div style={{
                  position: "absolute", top: "20%", left: "50%",
                  transform: "translate(-50%, -20%)", color: "white",
                  textAlign: "center", padding: "10px", width: "90%", maxWidth: "500px"
                }}>
                </div>
              </div>
            </div>
          </Container>

          {/* Delete Confirmation Modal */}
          <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to delete your account?
            </Modal.Body>
            <Modal.Footer>
              <button style={{ backgroundColor: "black", border: "none", color: "white", fontSize: "0.9rem", padding: "6px 12px" }} onClick={() => setShowConfirmModal(false)}>
                Cancel
              </button>
              <button style={{ backgroundColor: "black", border: "none", color: "white", fontSize: "0.9rem", padding: "6px 12px" }} onClick={() => {
                setShowConfirmModal(false);
                handleDelete();
              }}>
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
