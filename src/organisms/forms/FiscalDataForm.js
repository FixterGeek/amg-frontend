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
      <TextField name="rfc" label="RFC" />
      <TextField name="street" label="Dirección" />
      <TextField name="colony" label="Colonia" />
      <TextField name="zipCode" label="Código postal" />
      <TextField name="city" label="Ciudad" />
      <TextField name="state" label="Estado" />
      <AmgButton width="100%" htmlType="submit">
        Siguiente
      </AmgButton>
    </form>
  );
};

export default withRouter(FiscalDataForm);
