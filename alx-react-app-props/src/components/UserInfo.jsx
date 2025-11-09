import React, { useContext } from 'react';
import UserContext from './UserContext';

function UserInfo() {
  const userData = useContext(UserContext);

  return (
    <div>
      <h2>Welcome, {userData.name}!</h2>
      <p>Your email: {userData.email}</p>
    </div>
  );
}

export default UserInfo;
