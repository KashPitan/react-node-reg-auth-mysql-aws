import React, { useEffect } from "react";
import axios from "axios";

const MyProfile = () => {
  useEffect(() => {
    axios.get("/me");
  }, []);
  return <div></div>;
};
export default MyProfile;
