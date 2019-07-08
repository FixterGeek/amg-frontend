import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import WithoutLoginRoute from "./WithoutLoginRoute";
import Home from "../components/home/HomeContainer";
import Login from "../components/login/Login";
import Registration from "../components/signup/BeforeStaring";
import GeneralData from "../components/signup/GeneralData";
import FiscalData from "../components/signup/FiscalData";
import Signup from "../components/signup/Signup";
import DashBoard from "../pages/DashBoard";
import NotFound from "../pages/NotFound";

function AppRouter() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <WithoutLoginRoute path="/login" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/registration" exact component={Registration} />
      <Route path="/registration/general" exact component={GeneralData} />
      <Route path="/registration/fiscal" exact component={FiscalData} />
      <PrivateRoute path="/dashboard" component={DashBoard} />
      <Route component={NotFound} />
    </Router>
  );
}

export default AppRouter;
