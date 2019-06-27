import React, { useState } from "react";

import TextField from "../molecules/TextFields";
import AmgButton from "../atoms/Button";

export default () => {
  const [state, setState] = useState({
    name: "",
    dadSurname: "",
    momSurname: "",
    birthdate: "",
    placeOfBirth: "",
    specialty: ""
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
    <form className="login-form" style={{ width: "400px" }}>
      <TextField
        value={state.name}
        onChange={handleChange}
        name="name"
        label="Nombre"
      />

      <TextField
        value={state.dadSurname}
        onChange={handleChange}
        name="dadSurname"
        label="Apellido paterno"
      />

      <TextField
        value={state.momSurname}
        onChange={handleChange}
        name="momSurname"
        label="Apellido materno"
      />

      <TextField
        value={state.birthdate}
        onChange={handleChange}
        name="birthdate"
        label="Fecha de nacimiento"
      />

      <TextField
        value={state.placeOfBirth}
        onChange={handleChange}
        name="placeOfBirth"
        label="Lugar de nacimiento"
      />

      <TextField
        value={state.specialty}
        onChange={handleChange}
        name="specialty"
        label="Especialidad"
      />

      <AmgButton width="100%">Siguiente</AmgButton>
    </form>
  );
};
