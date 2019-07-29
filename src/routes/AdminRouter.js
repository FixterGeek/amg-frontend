import React from "react";
import { Switch, Route } from "react-router-dom";

import UserList from "../components/profile/UserProfileEdit";

function AdminRoute() {
  return (
    <Switch>
      <Route exact path="/admin/userlist" component={UserList} />>
    </Switch>
  );
}

export default AdminRoute;
