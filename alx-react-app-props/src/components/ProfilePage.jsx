import UserInfo from './UserInfo';
import React from 'react';
import UserDetails from './UserDetails';

function ProfilePage({ userData }) {
  return (
  <div>
    <h1>Profile Page</h1>
      <UserInfo />
      <UserDetails />
  </div>
  )
}

export default ProfilePage;
