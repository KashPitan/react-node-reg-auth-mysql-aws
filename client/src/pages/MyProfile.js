import React, { useEffect } from "react";
import axios from "axios";

const MyProfile = () => {
  useEffect(() => {
    console.log(axios.get(`${process.env.REACT_APP_AUTH_API_URL}/profile/me`));
  }, []);

  return (
    <>
      <div className="container">
        <h1>
          <strong>My Profile</strong>
        </h1>
      </div>
    </>
  );
};
export default MyProfile;
