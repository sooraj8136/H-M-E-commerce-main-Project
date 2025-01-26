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
import Nav from "react-bootstrap/Nav";
import { useSelector } from 'react-redux';

function ProfilePage() {

  const { darkMode } = useSelector((state) => state.mode);
  console.log(darkMode);

  const [profileData, isLoading, error] = useFetch('/user/profile');

  console.log("Profile Data :- ", profileData);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h1 className='text-center'>Profile</h1>
      <h2>{profileData?.name}</h2>
      <h2>{profileData?.email}</h2>
      <h2>{profileData?.mobile}</h2>
      <img src={profileData?.profilePic} alt="Profile" />
      <div className='buttons'>
        <button>Sign out</button>
        <button className="my-orders-btn">
          <div className="nav-sec-2 d-flex">
            <Nav.Link href="/user/orders" className={darkMode ? "text-black" : "text-white"}>My orders</Nav.Link>
          </div>
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
