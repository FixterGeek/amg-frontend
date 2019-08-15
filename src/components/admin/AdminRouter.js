import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AdminEvents from './AdminEvents'
import AdminEventForm from './AdminEventForm'
<<<<<<< HEAD
import UsersPage from '../users/UsersPage';
=======
import AdminUsers from './AdminUsers'
>>>>>>> 34c2b75efedec76f6dc6dbe90aec36dc9098f0db


function AdminRouter() {
  return (
    <Switch>
      {/* Group */}
      <Route exact path="/admin/users" component={AdminUsers} />
      {/* Group */}
      <Route path="/admin/events/edit/:id" component={AdminEventForm} />
<<<<<<< HEAD

      {/* Users List */}
      <Route exact path="/admin/users" component={UsersPage} />
      {/* Exams (Ivote) */}
=======
      <Route exact path="/admin/events/edit/" component={AdminEventForm} />
      <Route exact path="/admin/events" component={AdminEvents} />
>>>>>>> 34c2b75efedec76f6dc6dbe90aec36dc9098f0db
    </Switch>
  );
}

export default AdminRouter;
