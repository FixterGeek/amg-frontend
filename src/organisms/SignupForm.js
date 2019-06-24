import React, { useState } from "react";

import { Button } from "antd";

import TextField from "../molecules/TextFields";
import AmgButton from "../atoms/Button";

export default () => {
  const [state, setState] = useState({
    email: "",
    password: ""
  });

  const handleChange = event => {
    const {
      target: { value, name }
    } = event;
    setState({
      ...state,
      [name]: value
    });
  };

  return (
    <div className="login-form">
      <TextField label="Nombre" />

      <TextField
        value={state.email}
        onChange={handleChange}
        name="email"
        label="Correo"
      />
      <TextField
        value={state.password}
        onChange={handleChange}
        name="password"
        type="password"
        label="Contraseña"
        marginBottom="0px"
      />
      <AmgButton width="100%">Siguiente</AmgButton>
    </div>
  );
};
