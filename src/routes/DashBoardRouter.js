import React from "react";
import { Switch, Route } from "react-router-dom";

import Feed from "../components/feed/Feed";
import EventsList from "../components/events/EventsList";
import EventDetail from "../components/events/EventDetail";
import UserProfile from "../components/profile/UserProfileDetails";

function DashBoardRouter() {
  return (
    <Switch>
      <Route path="/dashboard/events/:id" component={EventDetail} />
      <Route path="/dashboard/events" component={EventsList} />
      <Route path="/dashboard/user/:id" component={UserProfile} />
      <Route path="/dashboard" component={Feed} />
    </Switch>
  );
}

export default DashBoardRouter;
