import React from "react";
import { BrowserRouter as Link } from "react-router-dom";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { logout } from "../redux/actions/authActions";

const Navbar = ({ user: { user }, isAuthenticated, logout }) => {
  const logoutOnClickHandler = async (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <>
      <nav>
        <div className="nav-wrapper">
          <a href="#" className="brand-logo">
            Rave
          </a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {!isAuthenticated && (
              <>
                <li>
                  <Link to="/register">Register</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            )}

            {isAuthenticated && (
              <>
                <li>
                  <Link to="/myProfile">My Profile</Link>
                </li>
                <li>
                  <Link to="/" onClick={(e) => logoutOnClickHandler(e)}>
                    Logout
                  </Link>
                  {/* <a href="/login" onClick={(e) => logoutOnClickHandler(e)}>
                    Logout
                  </a> */}
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

// export default Navbar;
Navbar.propTypes = {
  user: PropTypes.object,
  isAuthenticaed: PropTypes.bool,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Navbar);
