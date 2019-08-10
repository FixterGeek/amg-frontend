import React  from 'react';
import Footer from "./components/home/Footer";
import "moment/locale/es";
import AppRouter from "./routes/Router";

import "./styles/App.scss";

function App() {
  return (
    <>
      <AppRouter />
      <Footer/>
    </>
  );
}

export default App;
