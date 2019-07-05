import React from 'react';
import { Switch, Route } from 'react-router-dom';

import EventsList from '../components/events/EventsList';
import EventDetail from '../components/events/EventDetail';

function DashBoardRouter() {
  return (
    <Switch>
      <Route path="/dashboard/events/:id" component={EventDetail} />
      <Route path="/dashboard/events" component={EventsList} />
    </Switch>
  );
}

export default DashBoardRouter;
