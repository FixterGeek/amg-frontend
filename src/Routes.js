import React from "react";
import { Switch, Route } from "react-router-dom";
import HomeContainer from "./components/home/HomeContainer";

export const Router = () => (
  <Switch>
    <Route exact path="/" component={HomeContainer} />
  </Switch>
);

export default Router;
