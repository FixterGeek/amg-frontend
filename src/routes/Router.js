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
import AdminPage from '../components/admin/AdminPage';
import Biblioteca from "../components/home/Biblioteca";
import SeccionMensual from "../components/home/SeccionMensual"
import Nosotros from "../components/home/Nosotros";
import Contacto from "../components/home/Contacto";
import PreSign from "../components/signup/PreSign";
import Guias from "../components/home/Guias";
import Publicaciones from "../components/home/Publicaciones";

function AppRouter() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
        <Route path="/biblioteca" component={Biblioteca}/>
        <Route path="/guias" component={Guias}/>
        <Route path="/publicaciones" component={Publicaciones}/>
        <Route path="/sesion-mensual" component={SeccionMensual}/>
        <Route path="/nosotros" component={Nosotros}/>
        <Route path="/contacto" component={Contacto}/>
        <Route path="/pre-signup" component={PreSign}/>
      <Route path="/login" exact component={Login} />
      <Route path="/signup/general" exact component={General} />
      <Route path="/signup/education" exact component={Education} />
      <Route path="/signup/laboral" exact component={Laboral} />
      <Route path="/signup/fiscal" exact component={Fiscal} />
      <Route path="/signup/confirm" exact component={Confirm} />      
      <PrivateRoute path="/dashboard" component={DashBoard} />
      {/* Admin Section */}
      <PrivateRoute path="/admin" component={AdminPage} />
    </Router>
  );
}

export default AppRouter;
