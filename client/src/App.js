import React from "react";
import "./App.css";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import MyProfile from "./pages/MyProfile";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <>
      <Navbar></Navbar>
      <Router>
        <Switch>
          <Route path="/myProfile">
            <MyProfile />
          </Route>
          <Route path="/register">
            <Registration />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
