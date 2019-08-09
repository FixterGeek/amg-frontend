import React from 'react';
import { Switch, Route } from 'react-router-dom';
import EventsList from '../components/events/EventsList';
import ExamsList from '../components/exams/ExamsList';
import ExamDetail from '../components/exams/ExamDetail';
import NewEvent from '../components/events/NewEvent';
import Admin from '../components/admin/Admin';
import UsersPage from '../components/users/UsersPage';

function AdminRouter() {
  return (
    <Switch>
      
      <Route exact path="/admin" component={Admin} />
      <Route exact path="/admin/tests/:id" component={ExamDetail} />
      <Route exact path="/admin/tests" component={ExamsList} />

      <Route exact path="/admin/users/:id" component={UsersPage} />
      <Route exact path="/admin/users" component={UsersPage} />

      
      <Route exact path="/admin/events/new" component={NewEvent} />
      <Route exact path="/admin/events/" component={EventsList} />
    </Switch>
  );
}

export default AdminRouter;
