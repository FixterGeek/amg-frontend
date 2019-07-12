import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import WithoutLoginRoute from "./WithoutLoginRoute";
import Home from "../components/home/HomeContainer";
import Login from "../components/login/Login";
import Signup from "../components/signup/GeneralData";
import DashBoard from "../pages/DashBoard";

function AppRouter() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <WithoutLoginRoute path="/login" exact component={Login} />
      <Route path="/signup" exact render={() => <Signup />} />
      <PrivateRoute path="/dashboard" component={DashBoard} />
    </Router>
  );
}

export default AppRouter;
