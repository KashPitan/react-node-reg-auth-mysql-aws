import React from "react";

const Navbar = () => {
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
              <a href="#">My Profile</a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
