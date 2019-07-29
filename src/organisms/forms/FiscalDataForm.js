import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import TextField from "../../molecules/TextFields";
import AmgButton from "../../atoms/Button";
import { createUser } from "../../store/actions";

const FiscalDataForm = props => {
  const { history } = props;
  const [error, setError] = useState({
    name: false
  });
  const { user, dispatch } = props;

  const onChangeFiscal = e => {
    const {
      target: { value, name }
    } = e;
    dispatch(createUser({ fiscalData: { ...user.fiscalData, [name]: value } }));
  };

  const onChangeFiscalAddress = e => {
    const {
      target: { value, name }
    } = e;
    dispatch(
      createUser({
        fiscalData: {
          ...user.fiscalData,
          address: {
            ...user.fiscalData.address,
            [name]: value
          }
        }
      })
    );
  };

  console.log(user);

  const handleSubmit = e => {
    e.preventDefault();
    history.push("confirm");
  };

  return (
    <form
      className="signup-form"
      style={{ width: "400px" }}
      onSubmit={handleSubmit}
    >
      <TextField
        name="rfc"
        label="RFC"
        onChange={onChangeFiscal}
        value={user.fiscalData.rfc}
      />
      <TextField
        name="street"
        label="Dirección"
        onChange={onChangeFiscalAddress}
        value={user.fiscalData.address.street}
      />
      <TextField
        name="colony"
        label="Colonia"
        onChange={onChangeFiscalAddress}
        value={user.fiscalData.address.colony}
      />
      <TextField
        name="zipCode"
        label="Código postal"
        onChange={onChangeFiscalAddress}
        value={user.fiscalData.address.zipCode}
        type="number"
      />
      <TextField
        name="city"
        label="Ciudad"
        onChange={onChangeFiscalAddress}
        value={user.fiscalData.address.city}
      />
      <TextField
        name="state"
        label="Estado"
        onChange={onChangeFiscalAddress}
        value={user.fiscalData.address.state}
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

export default withRouter(connect(mapStateToProps)(FiscalDataForm));
