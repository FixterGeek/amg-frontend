import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Feed from '../components/feed/Feed';
import EventsList from '../components/events/EventsList';
import EventDetail from '../components/events/EventDetail';
import Program from '../components/events/Program';
import Speakers from '../components/events/Speakers';
import ActivityDetail from '../components/events/ActivityDetail';

function DashBoardRouter() {
  return (
    <Switch>
      <Route path="/dashboard/events/:id/program/:id" component={ActivityDetail} />
      <Route path="/dashboard/events/:id/program" component={Program} />
      <Route path="/dashboard/events/:id/speakers" component={Speakers} />
      <Route path="/dashboard/events/:id" component={EventDetail} />
      <Route exact path="/dashboard/events" component={EventsList} />
      <Route exact path="/dashboard" component={Feed} />
    </Switch>
  );
}

export default DashBoardRouter;
