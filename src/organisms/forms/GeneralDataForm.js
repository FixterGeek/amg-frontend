import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import momment from 'moment';

import { Checkbox } from 'antd';
import { writeSignupAction, writeBasicDataAction } from '../../store/ducks/signupDuck';
import TextField from '../../molecules/TextFields';
import SelectField from '../../molecules/SelectField';
import DatePicker from '../../molecules/DatePicker';
import AmgButton from '../../atoms/Button';
import { createUser } from '../../store/actions';
import Label from '../../atoms/data-entry/Label';

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
    userStatus: 'Pendiente'
  });

  const { signup, writeSignupAction, writeBasicDataAction } = props;
  const { basicData } = signup;
  // const { signup } = useAmgService();

  function onChangeCheckBox(e) {
    // const {
    //   target: { value, name, checked }
    // } = e;
    // if (value !== "Otra") {
    //   dispatch(createUser({ [name]: value }));
    //   console.log(`checked = ${e.target.checked}`);
    // } else {
    //   setChekedShow(checked);
    //   dispatch(createUser({ [name]: "" }));
    // }
  }

  const handleChange = (event) => {
    console.log(event);
    const { target } = event;
    const { name, value } = target;

    if (name === 'email') writeSignupAction({ email: value });
    else writeBasicDataAction({ [name]: value });
  };

  const handleDate = (date, name) => {
    writeBasicDataAction({ [name]: date.toString() });
  };

  console.log(signup);

  const handleSubmit = e => {
    e.preventDefault();
    history.push('education');
    
  };

  return (
    <form
      className="signup-form"
      style={{ width: '400px' }}
      onSubmit={handleSubmit}
    >
      <TextField
        value={basicData.name}
        onChange={handleChange}
        name="name"
        label="Nombre"
      />

      <TextField
        value={basicData.dadSurname}
        onChange={handleChange}
        name="dadSurname"
        label="Apellido paterno"
      />

      <TextField
        value={basicData.momSurname}
        onChange={handleChange}
        name="momSurname"
        label="Apellido materno"
      />
      <TextField
        width="100%"
        error={error.email}
        errorMessage="El email no puede estar vacio"
        value={signup.email}
        onChange={handleChange}
        name="email"
        label="Correo"
      />

      <DatePicker
        format="LL"
        label="Fecha de nacimiento"
        onChange={handleDate}
        name="birthDate"
        value={basicData.birthDate} />

      <TextField
        value={signup.birthdate}
        onChange={handleChange}
        name="birthdate"
        label="Fecha de nacimiento"
      />

      <SelectField
        value={signup.placeOfBirth}
        onChange={handleChange}
        name="placeOfBirth"
        label="Lugar de nacimiento"
        options={[{ value: 'Hidalgo', text: 'Hidalgo' }]}
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
            value={signup.specialty}
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
    signup: state.signup,
  };
}

export default withRouter(
  connect(mapStateToProps, { writeSignupAction, writeBasicDataAction })(GeneralDataForm),
);
