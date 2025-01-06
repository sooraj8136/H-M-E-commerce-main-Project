import React from 'react';
import { useFetch } from '../../hooks/useFetch';

function AdminProfile() {
  const [profileData, isLoading, error] = useFetch('/admin/admin-profile'); // Replace with the correct API for admin

  console.log('Admin Profile Data :- ', profileData);

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
     <div className="text-center text-danger">Error fetching profile data</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Admin Profile</h1>
      <div className="card mx-auto" style={{ maxWidth: '600px' }}>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <img 
                src={profileData?.profilePic} 
                alt="Admin Profile" 
                className="img-fluid rounded-circle" 
                style={{ width: '120px', height: '120px' }} 
              />
            </div>
            <div className="col-md-8">
              <h2>{profileData?.name}</h2>
              <p><strong>Email:</strong> {profileData?.email}</p>
              <p><strong>Mobile:</strong> {profileData?.mobile}</p>
              <p><strong>Role:</strong> {profileData?.role}</p>
              <p><strong>Qualification:</strong> {profileData?.qualification}</p>
              <p><strong>Status:</strong> {profileData?.isActive ? 'Active' : 'Inactive'}</p>
              <button className="btn btn-danger">Log out</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
