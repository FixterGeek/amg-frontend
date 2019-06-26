import React, { useState } from "react";

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
      <TextField
        value={state.name}
        onChange={handleChange}
        name="name"
        label="Nombre"
      />

      <TextField
        value={state.dadSurnamee}
        onChange={handleChange}
        name="dadSurname"
        label="Apellido Paterno"
      />

      <TextField
        value={state.momSurname}
        onChange={handleChange}
        name="momSurname"
        label="Apellido Materno"
      />

      <TextField
        value={state.surName}
        onChange={handleChange}
        name="momSurname"
        label="Fecha de Nacimiento"
      />

      <TextField
        value={state.surName}
        onChange={handleChange}
        name="momSurname"
        label="Lugar de Nacimiento"
      />

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
