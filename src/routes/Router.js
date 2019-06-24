import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from '../components/home/HomeContainer';
import Login from '../components/login/Login';

function AppRouter() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
    </Router>
  );
}

export default AppRouter;
