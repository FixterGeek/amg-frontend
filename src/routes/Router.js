import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "../components/home/HomeContainer";
import Login from "../components/login/Login";
import Signup from "../components/signup/Signup";

function AppRouter() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
    </Router>
  );
}

export default AppRouter;
