import React from 'react';

import Label from './Label';

function Input({ label, children }) {
  return (
    <div className="amg-field">
      <Label>{ label }</Label>
      <div>
        { children }
      </div>
    </div>
  );
}

export default Input;
