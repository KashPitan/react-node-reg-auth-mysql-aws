import React from "react";
import axios from "axios";

const Navbar = () => {
  const logoutOnClickHandler = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.get(
        `${process.env.REACT_APP_AUTH_API_URL}/auth/logout`,
        { withCredentials: true, credentials: "include" }
      );
      if (res.status === 200) {
        window.location = "/login";
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo">
            Rave
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <a href="/register">Register</a>
            </li>
            <li>
              <a href="/login">Login</a>
            </li>
            <li>
              <a href="/myProfile">My Profile</a>
            </li>
            <li>
              <a href="/login" onClick={(e) => logoutOnClickHandler(e)}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
