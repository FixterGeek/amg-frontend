import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import WithoutLoginRoute from './WithoutLoginRoute';
import Home from '../components/home/HomeContainer';
import Login from '../components/login/Login';
import Signup from '../components/signup/BeforeStaring';
import General from '../components/signup/GeneralData';
import Education from '../components/signup/EducationData';
import Laboral from '../components/signup/LaboralData';
import Fiscal from '../components/signup/FiscalData';
import Confirm from '../components/signup/Confirm';
import DashBoard from '../pages/DashBoard';


function AppRouter() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <WithoutLoginRoute path="/login" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/signup/general" exact component={General} />
      <Route path="/signup/education" exact component={Education} />
      <Route path="/signup/laboral" exact component={Laboral} />
      <Route path="/signup/fiscal" exact component={Fiscal} />
      <Route path="/signup/confirm" exact component={Confirm} />
      <PrivateRoute path="/dashboard" component={DashBoard} />
      {/* Admin Section */}
      <PrivateRoute path="/admin" component={AdminDashboard} />
    </Router>
  );
}

export default AppRouter;
