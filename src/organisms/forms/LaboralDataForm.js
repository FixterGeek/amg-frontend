import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import TextField from "../../molecules/TextFields";
import AmgButton from "../../atoms/Button";
import { Radio, Input } from "antd";

import { createUser } from "../../store/actions";
import Label from "../../atoms/data_entry/Label";

const LaboralDataForm = props => {
  const { history } = props;
  const [booleanRadio, setBooleanradio] = useState(false);
  const [error, setError] = useState({
    name: false
  });

  const { user, dispatch } = props;

  const onChangeWorked = e => {
    const {
      target: { value, name }
    } = e;
    dispatch(
      createUser({
        workedAtInstitutions: {
          ...user.workedAtInstitutions,
          institution: {
            ...user.workedAtInstitutions.institution,
            [name]: value
          }
        }
      })
    );
  };

  const onChangeWorkedLocation = e => {
    const {
      target: { value, name }
    } = e;
    dispatch(
      createUser({
        workedAtInstitutions: {
          ...user.workedAtInstitutions,
          institution: {
            ...user.workedAtInstitutions.institution,
            location: {
              ...user.workedAtInstitutions.institution.location,
              [name]: value
            }
          }
        }
      })
    );
  };

  const onChangeConsultories = e => {
    const {
      target: { value, name }
    } = e;
    dispatch(
      createUser({
        consultories: {
          ...user.consultories,
          institution: {
            ...user.consultories.institution,
            [name]: value
          }
        }
      })
    );
  };

  const onChangeConsultoriesLocation = e => {
    const {
      target: { value, name }
    } = e;
    dispatch(
      createUser({
        consultories: {
          ...user.consultories,
          institution: {
            ...user.consultories.institution,
            location: {
              ...user.consultories.institution.location,
              [name]: value
            }
          }
        }
      })
    );
  };

  console.log(user);

  const onChangeRadio = e => {
    const {
      target: { value, name, checked }
    } = e;
    console.log("radio checked", e);
  };

  const handleSubmit = () => {
    history.push("fiscal");
  };

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
      <TextField
        name="name"
        label="Nombre institución"
        onChange={onChangeWorked}
        value={user.workedAtInstitutions.institution.name}
      />
      <TextField
        name="street"
        label="Dirección"
        onChange={onChangeWorkedLocation}
        value={user.workedAtInstitutions.institution.location.street}
      />
      <TextField
        name="colony"
        label="Colonia"
        onChange={onChangeWorkedLocation}
        value={user.workedAtInstitutions.institution.location.colony}
      />
      <TextField
        name="zipCode"
        label="Código postal"
        onChange={onChangeWorkedLocation}
        value={user.workedAtInstitutions.institution.location.zipCode}
        type="number"
      />
      <TextField
        name="city"
        label="Ciudad"
        onChange={onChangeWorkedLocation}
        value={user.workedAtInstitutions.institution.location.city}
      />
      <TextField
        name="state"
        label="Estado"
        onChange={onChangeWorkedLocation}
        value={user.workedAtInstitutions.institution.location.state}
      />
      <Radio.Group>
        <Label>¿Posee un consultorio?</Label>
        <Radio style={radioStyle} value={1}>
          Si
        </Radio>
        <Radio style={radioStyle} value={2}>
          No
        </Radio>
      </Radio.Group>
      {}
      <TextField
        name="name"
        label="Nombre institución"
        onChange={onChangeConsultories}
        value={user.consultories.institution.name}
      />
      <TextField
        name="street"
        label="Dirección"
        onChange={onChangeConsultoriesLocation}
        value={user.consultories.institution.location.street}
      />
      <TextField
        name="colony"
        label="Colonia"
        onChange={onChangeConsultoriesLocation}
        value={user.consultories.institution.location.colony}
      />
      <TextField
        name="zipCode"
        label="Código postal"
        onChange={onChangeConsultoriesLocation}
        value={user.consultories.institution.location.zipCode}
        type="number"
      />
      <TextField
        name="city"
        label="Ciudad"
        onChange={onChangeConsultoriesLocation}
        value={user.consultories.institution.location.city}
      />
      <TextField
        name="state"
        label="Estado"
        onChange={onChangeConsultoriesLocation}
        value={user.consultories.institution.location.state}
      />
      <AmgButton width="100%" htmlType="submit">
        Siguiente
      </AmgButton>
    </form>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default withRouter(connect(mapStateToProps)(LaboralDataForm));
