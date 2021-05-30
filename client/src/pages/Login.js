import React, { useState } from "react";
import "materialize-css/dist/css/materialize.min.css";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { login } from "../redux/actions/authActions";

const Login = ({ login }) => {
  const [formDetails, setFormDetails] = useState({
    password: "",
    email: "",
  });

  //when submit button is pressed send information to register route
  //see ../../../routes/userOperationsRoutes.js
  const onSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await login(formDetails);
  };

  //updates the state as the form information changes
  const onChange = (e) => {
    setFormDetails({ ...formDetails, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="form-container">
        <h1>
          <strong>Login</strong>
        </h1>
        <form className="col s12">
          <div className="form-group">
            <div className="input-field col s6">
              <i className="material-icons prefix">email</i>
              <input
                id="email"
                name="email"
                type="email"
                className="validate"
                value={formDetails.email}
                onChange={onChange}
                required
              ></input>
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="form-group">
            <div className="input-field col s6">
              <i className="material-icons prefix">lock_outline</i>
              <input
                id="password"
                name="password"
                type="password"
                className="validate"
                value={formDetails.password}
                onChange={onChange}
                required
              ></input>
              <label htmlFor="password">Password</label>
            </div>
            <button
              className="btn waves-effect waves-light"
              type="Submit"
              name="action"
              onClick={onSubmit}
            >
              Submit
              <i className="material-icons right">send</i>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
};
export default connect(null, { login })(Login);
