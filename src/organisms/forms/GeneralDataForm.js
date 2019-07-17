import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import TextField from "../../molecules/TextFields";
import SelectField from "../../molecules/SelectField";
import { Checkbox, DatePicker } from "antd";
import moment from "moment";
//import useAmgService from "../../hooks/services/useAmgService";
import AmgButton from "../../atoms/Button";
import { createUser } from "../../store/actions";
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
    placeOfBirth: false
  });

  // const { MonthPicker, RangePicker } = DatePicker;
  // const dateFormat = "YYYY/MM/DD";
  // const monthFormat = "YYYY/MM";
  // const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

  const { user, dispatch } = props;
  // const { signup } = useAmgService();

  // state un nivel
  const onChangeData = e => {
    const {
      target: { value, name }
    } = e;
    dispatch(createUser({ [name]: value }));
  };

  // state nivel 2
  const onChangeBasicData = e => {
    const {
      target: { value, name }
    } = e;
    dispatch(createUser({ basicData: { ...user.basicData, [name]: value } }));
  };

  // state nivel 3
  const onChangeBasicDataPlace = e => {
    const {
      target: { value, name }
    } = e;
    dispatch(
      createUser({
        basicData: {
          ...user.basicData,
          placeOfBirth: {
            ...user.basicData.placeOfBirth,
            [name]: value
          }
        }
      })
    );
  };

  // state checkbox
  const onChangeCheckBox = e => {
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
  };

  // const handleChange = e => {
  //   const {
  //     target: { value, name }
  //   } = e;
  //   dispatch(createUser({ [name]: value }));

  //   //address: {...user.address, [name]: value}
  // };

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
        value={user.basicData.name}
        onChange={onChangeBasicData}
        name="name"
        label="Nombre"
      />

      <TextField
        value={user.basicData.dadSurname}
        onChange={onChangeBasicData}
        name="dadSurname"
        label="Apellido paterno"
      />

      <TextField
        value={user.basicData.momSurname}
        onChange={onChangeBasicData}
        name="momSurname"
        label="Apellido materno"
      />
      <TextField
        width="100%"
        error={error.email}
        errorMessage="El email no puede estar vacio"
        value={user.email}
        onChange={onChangeData}
        name="email"
        label="Correo"
      />

      <TextField
        value={user.basicData.birthdate}
        onChange={onChangeBasicData}
        name="birthdate"
        label="Fecha de nacimiento"
      />

      {/* <DatePicker
        defaultValue={moment("01/01/2015", dateFormatList[0])}
        format={dateFormatList}
        value={user.basicData.birthdate}
        onChange={onChangeBasicData}
        name="birthdate"
      /> */}

      <TextField
        value={user.basicData.placeOfBirth.state}
        onChange={onChangeBasicDataPlace}
        name="state"
        label="lugar de nacimiento"
      />

      {/* <SelectField
        value={user.basicData.placeOfBirth.state}
        onChange={onChangeBasicDataPlace}
        name="state"
        label="Estado de nacimiento"
        options={[{ value: "Hidalgo", text: "Hidalgo" }]}
      /> */}

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
            onChange={onChangeBasicData}
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
