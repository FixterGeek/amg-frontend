import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AdminEvents from './AdminEvents'
import AdminEventForm from './AdminEventForm'


function AdminRouter() {
  return (
    <Switch>
      {/* Group */}
      <Route exact path="/admin/events" component={AdminEvents} />
      <Route path="/admin/events/edit/" component={AdminEventForm} />
      <Route path="/admin/events/edit/:id" component={AdminEventForm} />
    </Switch>
  );
}

export default AdminRouter;
