import React from 'react';
import { useFetch } from '../../hooks/useFetch';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import { IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { axiosInstance } from '../../config/axiosInstance';

function ProfilePage() {

  const { darkMode } = useSelector((state) => state.mode);
  console.log(darkMode);

  const [profileData, error] = useFetch('/user/profile');
  console.log("Profile Data :- ", profileData);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/user/logout");
      console.log(response, "====response");
      toast.success("Logout success");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
      console.log(error);
    }
  };

  return (
    <>
      <div className="heading-head d-flex justify-content-center align-items-center mb-3">
        <p className={darkMode ? "text-black" : "text-white"}>
          HM.com / <span className="text-danger fw-bold">My Account</span>
        </p>
      </div>
      <div className="heading-head d-flex justify-content-center align-items-center ">
        <p className={darkMode ? "text-black" : "text-white"} style={{ fontSize: "30px", fontWeight: "600" }}>
          My Account
        </p>
      </div>
      <div className="d-flex justify-content-center align-items-center mb-3">
        <p className={`${darkMode ? "text-black" : "text-white"} responsive-text`} style={{ fontSize: "15px", fontWeight: "400" }}>
          You can manage your account and subscriptions here
        </p>
      </div>
      <Container data-theme={darkMode ? "dark" : "light"}>
        <div className="d-flex justify-content-center">
          <div className="profile-container p-4">
            <div className='m-4'>
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

            <div className='buttons-container justify-content-center'>
              <div className="buttons d-flex flex-column align-items-start mt-4">
                <button className="my-orders-btn d-flex justify-content-between w-100">
                  <Link to="/user/orders" className={darkMode ? "text-white" : "text-white"} style={{ textDecoration: "none", width: "100%" }}>
                    My Orders
                  </Link>
                  <IoIosArrowForward className="arrow-icon" />
                </button>
              </div>
              <div className="buttons d-flex flex-column align-items-start mt-4">
                <button className="my-orders-btn d-flex justify-content-between w-100">
                  <Link to="/user/update-user-profile" className={darkMode ? "text-white" : "text-white"} style={{ textDecoration: "none", width: "100%" }}>
                    Edit my profile
                  </Link>
                  <IoIosArrowForward className="arrow-icon" />
                </button>
              </div>
              <div className="buttons d-flex flex-column align-items-start mt-4">
                <button className="my-orders-btn d-flex justify-content-between w-100">
                  <Link to="/contact" className={darkMode ? "text-white" : "text-white"} style={{ textDecoration: "none", width: "100%" }}>
                    Contact us
                  </Link>
                  <IoIosArrowForward className="arrow-icon" />
                </button>
              </div>
              <div className="buttons d-flex flex-column align-items-start mt-4">
                <button className="my-orders-btn d-flex justify-content-between w-100" onClick={handleLogout}>
                  <span className={darkMode ? "text-white" : "text-white"}>
                    Sign out
                  </span>
                  <IoIosArrowForward className="arrow-icon" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default ProfilePage;