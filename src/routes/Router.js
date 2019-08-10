import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "../components/home/HomeContainer";
import Login from "../components/login/Login";
import Signup from "../components/signup/Signup";
import Biblioteca from "../components/home/Biblioteca";
import SeccionMensual from "../components/home/SeccionMensual"
import Nosotros from "../components/home/Nosotros";
import Contacto from "../components/home/Contacto";
import PreSign from "../components/signup/PreSign";


function AppRouter() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/biblioteca" component={Biblioteca}/>
      <Route path="/sesion-mensual" component={SeccionMensual}/>
      <Route path="/nosotros" component={Nosotros}/>
      <Route path="/contacto" component={Contacto}/>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/pre-signup" component={PreSign}/>
    </Router>
  );
}

export default AppRouter;
