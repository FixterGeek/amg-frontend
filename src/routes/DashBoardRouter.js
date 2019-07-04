import React from 'react';
import { Switch, Route } from 'react-router-dom';

import EventsList from '../components/events/EventsList';

function DashBoardRouter() {
  return (
    <Switch>
      <Route path="/dashboard/events" component={EventsList} />
    </Switch>
  );
}

export default DashBoardRouter;
