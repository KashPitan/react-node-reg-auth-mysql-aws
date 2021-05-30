import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Switch, Route } from "react-router-dom";

import Login from "./pages/Login";
import MyProfile from "./pages/MyProfile";
import Registration from "./pages/Registration";
import Home from "./pages/Home";

const Routes = () => {
  return (
    <>
      <Navbar></Navbar>
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
          <Home />
        </Route>
      </Switch>
    </>
  );
};

export default Routes;
