import React from 'react';
import { Switch, Route } from 'react-router-dom';
import EventsList from '../events/EventsList';
import ExamsList from '../exams/ExamsList';
import ExamDetail from '../exams/ExamDetail';
import NewEvent from '../events/NewEvent';
import Admin from './AdminPage';
import UsersPage from '../users/UsersPage';

function AdminRouter() {
  return (
    <Switch>
      <Route path="/admin/tests/:id" component={ExamDetail} />
      <Route path="/admin/tests" component={ExamsList} />
      <Route path="/admin/users/:id" component={UsersPage} />
      <Route path="/admin/users" component={UsersPage} />
      <Route path="/admin/events/new" component={NewEvent} />
      <Route path="/admin/events/" component={EventsList} />
    </Switch>
  );
}

export default AdminRouter;
