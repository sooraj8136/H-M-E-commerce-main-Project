// import React from 'react';
// import { useFetch } from '../../hooks/useFetch';
// import Nav from "react-bootstrap/Nav";
// import { useSelector } from 'react-redux';

// function ProfilePage() {

//   const { darkMode } = useSelector((state) => state.mode)
//   console.log(darkMode)

//   const [profileData, isLoading, error] = useFetch('/user/profile');

//   console.log("Profile Data :- ", profileData);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     <div>Error fetching profile data</div>;
//   }

//   return (
//     <>
//       <div>
//         <h1 className='text-center'>Profile</h1>
//         <h2>{profileData?.name}</h2>
//         <h2>{profileData?.email}</h2>
//         <h2>{profileData?.mobile}</h2>
//         <img src={profileData?.profilePic} alt="Profile" />
//       </div>
//       <button>Sign out</button>
//       <div>
//         <button>
//           <div className="nav-sec-2 d-flex">
//             <Nav.Link href="/user/orders" className={darkMode ? "text-black" : "text-white"}>My orders</Nav.Link>
//           </div>
//         </button>
//       </div>
//     </>
//   );
// }

// export default ProfilePage;


import React from 'react';
import { useFetch } from '../../hooks/useFetch';
import { useSelector } from 'react-redux';
import { Card, Container } from 'react-bootstrap';
import { IoIosArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom';

function ProfilePage() {

  const { darkMode } = useSelector((state) => state.mode);
  console.log(darkMode);

  const [profileData, error] = useFetch('/user/profile');

  console.log("Profile Data :- ", profileData);

  return (
    <>
      <div className="heading-head d-flex justify-content-center align-items-center mb-3">
        <p className={darkMode ? "text-black" : "text-white"}>
          HM.com / <span className="text-danger fw-bold">Account</span>
        </p>
      </div>
      <Container className="d-flex justify-content-center">
        <div className="profile-container p-4">
          <div>

            <div className="profile-details text-start text-dark">
              <div className="text-center mb-3">
                <img src={profileData?.profilePic} alt="Profile" className="profile-img" />
              </div>

              <div className="info-section">
                <p className="label">Name:</p>
                <h5 className="info-text">{profileData?.name}</h5>
              </div>

              <div className="info-section">
                <p className="label">Email:</p>
                <h5 className="info-text">{profileData?.email}</h5>
              </div>

              <div className="info-section">
                <p className="label">Mobile:</p>
                <h5 className="info-text">{profileData?.mobile}</h5>
              </div>
            </div>
            <br />
          </div>

          <div className='buttons-container justify-content-center'>
            <div className="buttons d-flex flex-column align-items-start mt-4">
              <button className="my-orders-btn d-flex justify-content-between w-100">
                <Link to="/user/orders" className={darkMode ? "text-white" : "text-white"}>
                  My Orders
                </Link>
                <IoIosArrowForward className="arrow-icon" />
              </button>
            </div>
            <div className="buttons d-flex flex-column align-items-start mt-4">
              <button className="my-orders-btn d-flex justify-content-between w-100">
                <Link to="/edit-profile" className={darkMode ? "text-white" : "text-white"}>
                  Edit my profile
                </Link>
                <IoIosArrowForward className="arrow-icon" />
              </button>
            </div>
            <div className="buttons d-flex flex-column align-items-start mt-4">
              <button className="my-orders-btn d-flex justify-content-between w-100">
                <Link to="/contact-us" className={darkMode ? "text-white" : "text-white"}>
                  Contact us
                </Link>
                <IoIosArrowForward className="arrow-icon" />
              </button>
            </div>
            <div className="buttons d-flex flex-column align-items-start mt-4">
              <button className="my-orders-btn d-flex justify-content-between w-100">
                <Link to="/contact-us" className={darkMode ? "text-white" : "text-white no-underline"}>
                  Sign out
                </Link>
                <IoIosArrowForward className="arrow-icon" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default ProfilePage;
