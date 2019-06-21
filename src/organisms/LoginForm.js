import React, { useState } from 'react';

import { Button } from 'antd';

import TextField from '../molecules/TextFields';
import AmgButton from '../atoms/Button';

function LoginForm() {
  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { target: { value, name } } = event;
    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <div className="login-form">
      <TextField
        value={state.email}
        onChange={handleChange}
        name="email"
        success
        label="Correo" />
      <TextField
        value={state.password}
        onChange={handleChange}
        name="password"
        type="password"
        label="Contraseña"
        marginBottom="0px" />
      <div>
        <Button type="link" style={{ padding: 0 }}>
          ¿Olvidaste tu contraseña?
        </Button>
      </div>
      <AmgButton
        width="100%">
        Iniciar sesión
      </AmgButton>
    </div>
  );
}

export default LoginForm;
