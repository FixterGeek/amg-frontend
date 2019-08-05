import React  from 'react';
import Footer from "./components/home/Footer";
import { Provider } from "react-redux";
import "moment/locale/es";
import Footer from "./components/home/Footer";

import store from "./store/store";
import AppRouter from "./routes/Router";

import "./styles/App.scss";

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
      <Footer/>
    </Provider>
  );
}

export default App;
