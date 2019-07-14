import React from "react";
import { withRouter } from "react-router-dom";

import TextField from "../../molecules/TextFields";
import SelectField from "../../molecules/SelectField";
import AmgButton from "../../atoms/Button";
import { DatePicker, Radio } from "antd";

const GeneralDataFormD = ({ history }) => {
  const handleSubmit = () => {
    history.push("education");
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
      <SelectField name="placeOfBirth" label="Lugar de nacimiento" />
      <TextField name="specialty" label="Especialidad" />
      <AmgButton width="100%" htmlType="submit">
        Siguiente
      </AmgButton>
    </form>
  );
};

export default withRouter(GeneralDataFormD);
