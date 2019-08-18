import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AdminEvents from './AdminEvents'
import AdminEventForm from './AdminEventForm'
import AdminUsers from './AdminUsers'
import AdminTests from './AdminTests'
import AdminTestForm from './AdminTestForm';
import AdminTestQuestionsForm from './AdminTestQuestionsForm';


function AdminRouter() {
  return (
    <Switch>
      {/* Group */}
      <Route exact path="/admin/users" component={AdminUsers} />
      {/* Group */}
      <Route path="/admin/events/edit/:id" component={AdminEventForm} />
      <Route exact path="/admin/events/edit/" component={AdminEventForm} />
      <Route exact path="/admin/events" component={AdminEvents} />
      {/* Examenes */}
      <Route exact path="/admin/tests" component={AdminTests} />      
      <Route exact path="/admin/tests/new" component={AdminTestForm} />
      <Route exact path="/admin/tests/questions" component={AdminTestQuestionsForm} />  
      <Route exact path="/admin/tests/edit/:id" component={AdminTestForm} />
      <Route exact path="/admin/tests/:id/questions" component={AdminTestQuestionsForm} />  
      
    </Switch>
  );
}

export default AdminRouter;
