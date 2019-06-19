import React, { useState } from 'react';
import './styles/App.scss';

import TextField from './molecules/TextFields';

function App() {
  const [state, setState] = useState(null);

  const handleChange = (e) => {
    const { value } = e.target;
    setState(value);
  };

  return (
    <div>
      <TextField onChange={handleChange} value={state} />
    </div>
  );
}

export default App;
