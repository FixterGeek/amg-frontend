import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AdminEvents from './AdminEvents'
import AdminEventForm from './AdminEventForm'
import AdminUsers from './AdminUsers'


function AdminRouter() {
  return (
    <Switch>
      {/* Group */}
      <Route exact path="/admin/users" component={AdminUsers} />
      {/* Group */}
      <Route path="/admin/events/edit/:id" component={AdminEventForm} />
      <Route exact path="/admin/events/edit/" component={AdminEventForm} />
      <Route exact path="/admin/events" component={AdminEvents} />
    </Switch>
  );
}

export default AdminRouter;
