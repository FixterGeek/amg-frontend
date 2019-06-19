import React, { useState } from "react";
import "./styles/App.scss";

import TextField from "./molecules/TextFields";
import Oval from "./atoms/oval_steper/Oval";
import Reactangle from "./atoms/rectangle_4/Reactangle";

function App() {
  const [state, setState] = useState(null);

  const handleChange = e => {
    const { value } = e.target;
    setState(value);
  };

  return (
    <div>
      <TextField onChange={handleChange} value={state} />
      <Reactangle />
    </div>
  );
}

export default App;
