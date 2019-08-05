import React from "react";
import { withRouter } from "react-router-dom";

import TextField from "../../molecules/TextFields";
import AmgButton from "../../atoms/Button";
import { Radio, Input } from "antd";

//import { createUser } from "../../store/actions";
import Label from "../../atoms/data_entry/Label";

const LaboralDataForm = ({ history }) => {
  const handleSubmit = () => {
    history.push("fiscal");
  };

  function onChangeRadio(e) {
    const {
      target: { value, name, checked }
    } = e;
    console.log("radio checked", e);
  }

  const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px"
  };

  return (
    <form
      className="signup-form"
      style={{ width: "400px" }}
      onSubmit={handleSubmit}
    >
      <Radio.Group //onChange={onChangeRadio} value={value}
      >
        <Label>¿Actualmente labora en un hospital o institución?</Label>
        <Radio style={radioStyle} value={1}>
          Si
        </Radio>
        <Radio style={radioStyle} value={2}>
          No
        </Radio>
      </Radio.Group>
      <TextField name="institution" label="Nombre institución" />
      <TextField name="street" label="Dirección" />
      <TextField name="momSurname" label="Colonia" />
      <TextField name="email" label="Código postal" />
      <TextField name="placeOfBirth" label="Ciudad" />
      <TextField name="specialty" label="Estado" />
      <Radio.Group //onChange={onChangeRadio} value={value}
      >
        <Label>¿Posee un consultorio?</Label>
        <Radio style={radioStyle} value={1}>
          Si
        </Radio>
        <Radio style={radioStyle} value={2}>
          No
        </Radio>
      </Radio.Group>
      <AmgButton width="100%" htmlType="submit">
        Siguiente
      </AmgButton>
    </form>
  );
};

export default withRouter(LaboralDataForm);
