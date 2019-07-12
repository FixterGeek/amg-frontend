import React from "react";
import { withRouter } from "react-router-dom";

import TextField from "../../molecules/TextFields";
import AmgButton from "../../atoms/Button";

const FiscalDataForm = ({ history }) => {
  const handleSubmit = () => {
    history.push("confirm");
  };

  return (
    <form
      className="signup-form"
      style={{ width: "400px" }}
      onSubmit={handleSubmit}
    >
      <TextField name="name" label="Nombre" />
      <TextField name="dadSurname" label="Apellido paterno" />
      <TextField name="momSurname" label="Apellido materno" />
      <TextField name="email" label="Correo" />
      <TextField name="placeOfBirth" label="Lugar de nacimiento" />
      <TextField name="specialty" label="Especialidad" />
      <AmgButton width="100%" htmlType="submit">
        Siguiente
      </AmgButton>
    </form>
  );
};

export default withRouter(FiscalDataForm);
