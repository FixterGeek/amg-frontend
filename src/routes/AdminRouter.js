import React from "react";
import { Switch, Route } from "react-router-dom";

import PartnersList from "../components/partners/PartnersList";
import Events from "../components/events/EventCreate";
import InvoicesList from "../components/invoices/InvoiceList";

function AdminRoute() {
  return (
    <Switch>
      <Route exact path="/admin/partners" component={PartnersList} />
      <Route exact path="/admin/events" component={Events} />
      <Route exact path="/admin/invoices" component={InvoicesList} />
    </Switch>
  );
}

export default AdminRoute;
