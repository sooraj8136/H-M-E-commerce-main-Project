import React from 'react';
import { useFetch } from '../../hooks/useFetch';

function ProfilePage() {

  const [profileData, isLoading, error] = useFetch('/user/profile');
  
  console.log("Profile Data :- ", profileData);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    <div>Error fetching profile data</div>;
  }

  return (
    <>
      <div>
        <h1 className='text-center'>Profile</h1>
        <h2>{profileData?.name}</h2>
        <h2>{profileData?.email}</h2>
        <h2>{profileData?.mobile}</h2>
        <img src={profileData?.profilePic} alt="Profile" />
      </div>
      <button>Log out</button>
    </>
  );
}

export default ProfilePage;
