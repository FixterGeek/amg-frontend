import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import TextField from "../molecules/TextFields";
import useAmgService from "../hooks/services/useAmgService";
import AmgButton from "../atoms/Button";
import Spinner from "../atoms/Spinner";
import { createUser } from "../store/actions";

function SignupForm(props) {
  const { history } = props;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    name: false,
    dadSurname: false,
    momSurname: false,
    email: false,
    password: false,
    birthdate: false,
    placeOfBirth: false,
    specialty: false
  });

  const { user, dispatch } = props;
  const { signup } = useAmgService();

  const handleChange = e => {
    const {
      target: { value, name }
    } = e;
    dispatch(createUser({ [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);

    signup(user.email, user.password)
      .then(async ({ data }) => {
        await dispatch(createUser({ ...data.user, userToken: data.token }));
        await setLoading(false);
        await localStorage.setItem("authToken", data.token);
        history.push("/dashboard");
      })
      .catch(() => {
        setLoading(false);
        setError({ email: true, password: true });
      });
  };

  return (
    <form
      className="signup-form"
      style={{ width: "400px" }}
      onSubmit={handleSubmit}
    >
      {loading && <Spinner tip="Registrando usuario..." />}
      {/* <TextField
        value={user.name}
        onChange={handleChange}
        name="name"
        label="Nombre"
      /> */}

      {/* <TextField
        value={user.dadSurname}
        onChange={handleChange}
        name="dadSurname"
        label="Apellido paterno"
      /> */}

      {/* <TextField
        value={user.momSurname}
        onChange={handleChange}
        name="momSurname"
        label="Apellido materno"
      /> */}

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
        width="100%"
        error={error.password}
        errorMessage="la contraseña no puede ir vacia"
        value={user.password}
        onChange={handleChange}
        name="password"
        type="password"
        label="Contraseña"
        marginBottom="0px"
      />

      {/* <TextField
        value={user.birthdate}
        onChange={handleChange}
        name="birthdate"
        label="Fecha de nacimiento"
      /> */}

      {/* <TextField
        value={user.placeOfBirth}
        onChange={handleChange}
        name="placeOfBirth"
        label="Lugar de nacimiento"
      /> */}

      {/* <TextField
        value={user.specialty}
        onChange={handleChange}
        name="specialty"
        label="Especialidad"
      /> */}

      <AmgButton width="100%" htmlType="submit">
        Regístrate
      </AmgButton>
    </form>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default withRouter(connect(mapStateToProps)(SignupForm));
