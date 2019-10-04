import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import WithoutLoginRoute from './WithoutLoginRoute';
import Home from '../components/home/HomeContainer';
import Login from '../components/login/Login';
import DashBoard from '../pages/DashBoard';
import AdminPage from '../components/admin/AdminPage';
import Biblioteca from "../components/home/Biblioteca";
import SeccionMensual from "../components/home/SeccionMensual"
import Nosotros from "../components/home/Nosotros";
import Contacto from "../components/home/Contacto";
import PreSign from "../components/signup/PreSign";
import Signup from '../components/signup/Signup';
import Guias from "../components/home/Guias";
import Publicaciones from "../components/home/Publicaciones";
import SemanaNacional from '../components/home/SemanaNacional';
import Tables from '../components/home/Tables';

function AppRouter() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
        <Route path="/mesa-directiva" component={Tables} />
        <Route path="/semana-nacional" component={SemanaNacional}/>
        <Route path="/biblioteca" component={Biblioteca}/>
        <Route path="/guias" component={Guias}/>
        <Route path="/publicaciones" component={Publicaciones}/>
        <Route path="/sesion-mensual" component={SeccionMensual}/>
        <Route path="/nosotros" component={Nosotros}/>
        <Route path="/contacto" component={Contacto}/>
        <Route path="/pre-signup" component={PreSign}/>
      <Route path="/login/reset" exact component={Login} />
      <Route path="/login" exact component={Login} />
      <Route path="/signup/general" exact component={Signup} />
      <Route path="/signup/educacion" exact component={Signup} />
      <Route path="/signup/docentes" exact component={Signup} />
      <Route path="/signup/laborales" exact component={Signup} />
      <Route path="/signup/fiscales" exact component={Signup} />
      <PrivateRoute path="/dashboard" component={DashBoard} />
      {/* Admin Section */}
      <PrivateRoute path="/admin" component={AdminPage} />
    </Router>
  );
}

export default AppRouter;
