import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Oval from "./atoms/oval/Oval";
import Line from "./atoms/line/Line";
import NumberOval from "./atoms/numberOval/NumberOval";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Oval />
        <NumberOval />
        <Line />
      </header>
    </div>
  );
}

export default App;
