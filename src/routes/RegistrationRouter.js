import React from "react";
import { Switch, Route } from "react-router-dom";
import Registration from "../components/signup/BeforeStaring";
import GeneralData from "../components/signup/GeneralData";
import FiscalData from "../components/signup/FiscalData";

const RegistrationRouter = () => {
  return (
    <Switch>
      <Route path="/signup" exact component={Registration} />
      <Route path="/signup/general" component={GeneralData} />
      <Route path="/signup/fiscal" component={FiscalData} />
    </Switch>
  );
};

export default RegistrationRouter;
