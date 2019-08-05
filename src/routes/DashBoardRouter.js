import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Feed from '../components/feed/Feed';
import EventsList from '../components/events/EventsList';
import EventDetail from '../components/events/EventDetail';
import Program from '../components/events/Program';
import Speakers from '../components/events/Speakers';
import ActivityDetail from '../components/events/ActivityDetail';
import Settings from '../components/settings/Settings';
import MembershipPayment from '../components/membership/MembershipPayment';


function DashBoardRouter() {
  return (
    <Switch>
      <Route path="/dashboard/events/:id/program/:id" component={ActivityDetail} />
      <Route path="/dashboard/events/:id/program" component={Program} />
      <Route path="/dashboard/events/:id/speakers" component={Speakers} />
      <Route path="/dashboard/events/:id" component={EventDetail} />
      <Route path="/dashboard/payment/:membership/:type" component={MembershipPayment} />
      <Route path="/dashboard/payment/:membership" component={MembershipPayment} />
      <Route exact path="/dashboard/settings/" component={Settings} />
      <Route exact path="/dashboard/events" component={EventsList} />
      <Route exact path="/dashboard" component={Feed} />
    </Switch>
  );
}

export default DashBoardRouter;
