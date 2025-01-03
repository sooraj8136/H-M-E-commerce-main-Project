// import React from 'react';
// import { useFetch } from '../../hooks/useFetch';

// function SellerProfile() {

//   const [profileData, isLoading, error] = useFetch('/seller/seller-profile');

//   console.log('Profile Data :- ', profileData);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     <div>Error fetching profile data</div>;
//   }

//   return (
//     <div>
//       <h1 className='text-center'>Profile</h1>
//       <h2>{profileData?.name}</h2>
//       <h2>{profileData?.email}</h2>
//       <h2>{profileData?.mobile}</h2>
//       <h2>{profileData?.storeName}</h2>
//       <h2>{profileData?.address}</h2>
//       <img src={profileData?.profilePic} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
//       <button>Log out</button>
//     </div>
//   );
// }

// export default SellerProfile;



import React from 'react';
import { useFetch } from '../../hooks/useFetch';

function SellerProfile() {

  const [profileData, isLoading, error] = useFetch('/seller/seller-profile');

  console.log('Profile Data :- ', profileData);

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    <div className="text-center text-danger">Error fetching profile data</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Profile</h1>
      <div className="card mx-auto" style={{ maxWidth: '600px' }}>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <img 
                src={profileData?.profilePic} 
                alt="Profile" 
                className="img-fluid rounded-circle" 
                style={{ width: '120px', height: '120px' }} 
              />
            </div>
            <div className="col-md-8">
              <h2>{profileData?.name}</h2>
              <p><strong>Email:</strong> {profileData?.email}</p>
              <p><strong>Mobile:</strong> {profileData?.mobile}</p>
              <p><strong>Store Name:</strong> {profileData?.storeName}</p>
              <p><strong>Address:</strong> {profileData?.address}</p>
              <button className="btn btn-danger">Log out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerProfile;
