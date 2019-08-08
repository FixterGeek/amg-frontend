import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import TextField from "../../molecules/TextFields";
import SelectField from "../../molecules/SelectField";
import { Checkbox } from "antd";
//import useAmgService from "../../hooks/services/useAmgService";
import AmgButton from "../../atoms/Button";
import { createUser } from "../../redux/actions";
import Label from "../../atoms/data_entry/Label";

function GeneralDataForm(props) {
  const { history } = props;
  const [chekedShow, setChekedShow] = useState(false);
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
  // const { signup } = useAmgService();

  function onChangeCheckBox(e) {
    const {
      target: { value, name, checked }
    } = e;
    if (value !== "Otra") {
      dispatch(createUser({ [name]: value }));
      console.log(`checked = ${e.target.checked}`);
    } else {
      setChekedShow(checked);
      dispatch(createUser({ [name]: "" }));
    }
  }

  const handleChange = e => {
    const {
      target: { value, name }
    } = e;
    dispatch(createUser({ [name]: value }));

    //address: {...user.address, [name]: value}
  };

  console.log(user);

  const handleSubmit = e => {
    e.preventDefault();
    history.push("education");
    // signup(
    //   user.name,
    //   user.dadSurname,
    //   user.momSurname,
    //   user.email,
    //   user.birthDate,
    //   user.placleOfBirth,
    // )
    //   .then(async ({ data }) => {
    //     await dispatch(createUser({ ...data.user, userToken: data.token }));
    //     await localStorage.setItem("authToken", data.token);
    //     console.log(data);
    //     history.push("/education");
    //   })
    //   .catch(() => {
    //     setError({
    //       name: true,
    //       dadSurname: true,
    //       momSurname: true,
    //       email: true,
    //       birthDate: true
    //     });
    //   });
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

      <SelectField
        value={user.placeOfBirth}
        onChange={handleChange}
        name="placeOfBirth"
        label="Lugar de nacimiento"
        options={[{ value: "Hidalgo", text: "Hidalgo" }]}
      />

      <Label>Especialidad</Label>
      <div className="check-box">
        <Checkbox
          onChange={onChangeCheckBox}
          name="specialty"
          value="Medicina Interna"
        >
          Medicina Interna
        </Checkbox>
        <Checkbox
          onChange={onChangeCheckBox}
          name="specialty"
          value="Gastroenterología pediátrica"
        >
          Gastroenterología pediátrica
        </Checkbox>
        <Checkbox
          onChange={onChangeCheckBox}
          name="specialty"
          value="Cirugía interna"
        >
          Cirugía interna
        </Checkbox>
        <Checkbox
          onChange={onChangeCheckBox}
          name="specialty"
          value="Gastroenterología"
        >
          Gastroenterología
        </Checkbox>
        <Checkbox
          onChange={onChangeCheckBox}
          name="specialty"
          value="Endoscopía gastrointestinal"
        >
          Endoscopía gastrointestinal
        </Checkbox>
        <Checkbox onChange={onChangeCheckBox} name="specialty" value="Otra">
          Otra
        </Checkbox>
        {chekedShow && (
          <TextField
            value={user.specialty}
            onChange={handleChange}
            name="specialty"
            label="Especialidad"
          />
        )}
      </div>

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
