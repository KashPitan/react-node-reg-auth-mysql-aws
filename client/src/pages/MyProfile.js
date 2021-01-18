import React, { useEffect, useState } from "react";
import axios from "axios";

const MyProfile = () => {
  const [profileInfo, setProfileInfo] = useState({});

  useEffect(() => {
    console.log("myprofile");
    //with credentials flag sends cookies with request
    axios
      .get(`${process.env.REACT_APP_AUTH_API_URL}/profile/me`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setProfileInfo((prevState) => res.data.user);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="container">
        <h1>
          <strong>My Profile</strong>
        </h1>
        <h2>Username: {profileInfo.username}</h2>
        <h2>Email: {profileInfo.email}</h2>
      </div>
    </>
  );
};
export default MyProfile;
