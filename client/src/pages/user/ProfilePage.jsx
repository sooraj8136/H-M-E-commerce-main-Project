import React from 'react'
import { useFetch } from '../../hooks/useFetch'

function ProfilePage() {

    const [profileData, error] = useFetch('/user/profile')
    console.log("Profile Data :- ", profileData)

  return (
    <div>
      <h1 className='text-center'>Profile</h1>
      <h2>{profileData?.data?.name}</h2>
      <h2>{profileData?.data?.email}</h2>
      <h2>{profileData?.data?.mobile}</h2>
      <img src={profileData?.data?.profilePic}/>
    </div>
  )
}

export default ProfilePage


