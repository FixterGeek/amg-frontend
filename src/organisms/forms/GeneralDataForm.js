import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import TextField from "../../molecules/TextFields";
import useAmgService from "../../hooks/services/useAmgService";
import AmgButton from "../../atoms/Button";
import { createUser } from "../../store/actions";

function GeneralDataForm(props) {
  const { history } = props;
  const [error, setError] = useState({
    name: false,
    dadSurname: false,
    momSurname: false,
    email: false,
    birthDate: false,
    placeOfBirth: false,
    specialty: false,
    userStatus: "Pendiente"
  });

  const { user, dispatch } = props;
  const { signup } = useAmgService();

  const handleChange = e => {
    const {
      target: { value, name }
    } = e;
    console.log(e);
    dispatch(createUser({ [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    signup(
      user.name,
      user.dadSurname,
      user.momSurname,
      user.email,
      user.birthDate,
      user.placleOfBirth,
      user.userStatus
    )
      .then(async ({ data }) => {
        await dispatch(createUser({ ...data.user, userToken: data.token }));
        await localStorage.setItem("authToken", data.token);
        console.log(data);
        history.push("dashboard/user");
      })
      .catch(() => {
        setError({
          name: true,
          dadSurname: true,
          momSurname: true,
          email: true,
          birthDate: true
        });
      });
  };

  return (
    <form
      className="signup-form"
      style={{ width: "400px" }}
      onSubmit={handleSubmit}
    >
      <TextField
        value={user.name}
        onChange={handleChange}
        name="name"
        label="Nombre"
      />

      <TextField
        value={user.dadSurname}
        onChange={handleChange}
        name="dadSurname"
        label="Apellido paterno"
      />

      <TextField
        value={user.momSurname}
        onChange={handleChange}
        name="momSurname"
        label="Apellido materno"
      />
      <TextField
        width="100%"
        error={error.email}
        errorMessage="El email no puede estar vacio"
        value={user.email}
        onChange={handleChange}
        name="email"
        label="Correo"
      />

      <TextField
        value={user.birthdate}
        onChange={handleChange}
        name="birthdate"
        label="Fecha de nacimiento"
      />

      <TextField
        value={user.placeOfBirth}
        onChange={handleChange}
        name="placeOfBirth"
        label="Lugar de nacimiento"
      />

      <TextField
        value={user.specialty}
        onChange={handleChange}
        name="specialty"
        label="Especialidad"
      />

      <AmgButton width="100%" htmlType="submit">
        Siguiente
      </AmgButton>
    </form>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default withRouter(connect(mapStateToProps)(GeneralDataForm));
