import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AdminEvents from './AdminEvents'
import AdminEventForm from './AdminEventForm'
import UsersPage from '../users/UsersPage';


function AdminRouter() {
  return (
    <Switch>
      {/* Group */}
      <Route exact path="/admin/events" component={AdminEvents} />
      <Route path="/admin/events/edit/" component={AdminEventForm} />
      <Route path="/admin/events/edit/:id" component={AdminEventForm} />

      {/* Users List */}
      <Route exact path="/admin/users" component={UsersPage} />
      {/* Exams (Ivote) */}
    </Switch>
  );
}

export default AdminRouter;
