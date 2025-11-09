import React, { useContext } from "react";
import UserContext from "./UserContext";
function UserDetails({ userData }) {
    const userData = useContext(UserContext);
  return (
    <div>
      <h2>User Details</h2>
      <p><strong>Name:</strong> {userData.name}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>Role:</strong> {userData.role}</p>
    </div>
  );
}

export default UserDetails;