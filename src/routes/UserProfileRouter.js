import React from "react";
import { Switch, Route } from "react-router-dom";
import UserDetails from "../components/profile/UserProfileDetails";

const UserProfileRouter = () => {
  return (
    <Switch>
      <Route path="/dasboard/user/:id" component={UserDetails} />
    </Switch>
  );
};

export default UserProfileRouter;
