import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AdminEvents from './AdminEvents'
import AdminEventForm from './AdminEventForm'
import AdminUsers from './AdminUsers'
import AdminTests from './AdminTests'
import AdminTestForm from './AdminTestForm';
import AdminTestQuestionsForm from './AdminTestQuestionsForm';
import AdminResources from './AdminResources';
import AdminResourcesForm from './AdminResourcesForm';
import AdminInvoices from './invoices/AdminInvoices';
import AdminInvoicesForm from './invoices/AdminInvoicesForm';
import AdminInvoicesFiscalData from './invoices/AdminInvoicesFiscalData';
import AdminInvoicesPayment from './invoices/AdminInvoicesPayments';
import AdminEventsEdit from './events/AdminEventEdit';
import AdminSubsidiaries from './subsidiaries/AdminSubsidiaries';
import AdminSubsidiaryProfile from './subsidiaries/AdminSubsidiaryProfile';
import AdminSubsidiaryForm from './subsidiaries/AdminSubsidiaryForm';
import AdminUserDetail from './AdminUserDetail';
import AdminDashboard from './AdminDashboard';


function AdminRouter() {
  return (
    <Switch>
      {/* Dash */}
      <Route path="/admin/dashboard" component={AdminDashboard} />
      {/* Filiales */}
      <Route path="/admin/filiales/:id/edit" component={AdminSubsidiaryForm} />
      <Route path="/admin/filiales/:id" component={AdminSubsidiaryProfile} />
      <Route exact path="/admin/filiales" component={AdminSubsidiaries} />
      {/* Invoices */}
      <Route exact path="/admin/invoices/payments" component={AdminInvoicesPayment} />
      <Route exact path="/admin/invoices/fiscals" component={AdminInvoicesFiscalData} />
      <Route exact path="/admin/invoices/edit" component={AdminInvoicesForm} />
      <Route exact path="/admin/invoices" component={AdminInvoices} />
      {/*Resources */}
      <Route path="/admin/resources/edit/:id" component={AdminResourcesForm} />
      <Route exact path="/admin/resources/edit" component={AdminResourcesForm} />
      <Route exact path="/admin/resources" component={AdminResources} />
      {/* Userus */}
      <Route exact path="/admin/users" component={AdminUsers} />
      <Route exact path="/admin/users/:userId" component={AdminUserDetail} />
      {/* Events */}
      <Route path="/admin/eventos/edit/:id" component={AdminEventsEdit} />
      <Route path="/admin/eventos/edit" component={AdminEventsEdit} />
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
