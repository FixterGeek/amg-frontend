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
import PersonalProfile from '../components/profile/PersonalProfile';
import MainProfile from '../components/profile/MainProfile';
import PaymentActivity from '../components/membership/PaymentActivity';


function DashBoardRouter() {
  const baseURL = '/dashboard';
  return (
    <Switch>
      <Route exact path={`${baseURL}/perfil/editar`} component={PersonalProfile} />
      <Route path="/dashboard/perfil" component={MainProfile} />
      <Route path="/dashboard/payment/activity/:id" component={PaymentActivity} />
      <Route path={`${baseURL}/payment/:membership/:type`} component={MembershipPayment} />
      <Route path={`${baseURL}/payment/:membership`} component={MembershipPayment} />
      <Route path={`${baseURL}/events/:id/program/:id`} component={ActivityDetail} />
      <Route path={`${baseURL}/events/:id/program`} component={Program} />
      <Route path={`${baseURL}/events/:id/speakers`} component={Speakers} />
      <Route path={`${baseURL}/events/:id`} component={EventDetail} />
      <Route exact path={`${baseURL}/settings/`} component={Settings} />
      <Route exact path={`${baseURL}/events`} component={EventsList} />
      <Route exact path={`${baseURL}`} component={Feed} />
    </Switch>
  );
}

export default DashBoardRouter;
