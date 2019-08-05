import React from "react";
import { Switch, Route } from "react-router-dom";
import UserDetail from "../components/profile/UserDetail";

const UserProfileRouter = () => {
  return (
    <Switch>
      <Route path="/dasboard/user/:id" component={UserDetail} />
    </Switch>
  );
};

export default UserProfileRouter;
