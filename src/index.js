import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import '../node_modules/font-awesome/css/font-awesome.min.css';
import "./index.css";

const WithRoute = () => (
  <Router>
    <App />
  </Router>
);

ReactDOM.render(<WithRoute />, document.getElementById("root"));
registerServiceWorker();
