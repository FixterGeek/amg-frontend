import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Radio } from 'antd';

import {
  writeSignupAction, writeBasicDataAction, writePlaceOfBirdAction,
  signupUserAction,
} from '../../store/ducks/signupDuck';
import TextField from '../../molecules/TextFields';
import SelectField from '../../molecules/SelectField';
import DatePicker from '../../molecules/DatePicker';
import AmgButton from '../../atoms/Button';
import Label from '../../atoms/data-entry/Label';

import states from './estados.json';

function GeneralDataForm({
  history, signup, writeSignupAction,
  writeBasicDataAction, writePlaceOfBirdAction, signupUserAction
}) {
  const { Group } = Radio;


  const { basicData } = signup;
  // const { signup } = useAmgService();

  const handleChange = (event) => {
    console.log(event);
    console.log(event);
    const { target } = event;
    const { name, value } = target;

    if (name === 'email' || name === 'password') writeSignupAction({ [name]: value });
    if (name === 'placeOfBirth') writePlaceOfBirdAction({ addressName: value });
    else writeBasicDataAction({ [name]: value });
  };

  const handleDate = (date, name) => {
    writeBasicDataAction({ [name]: date.toString() });
  };

  const handleState = (value) => {
    writePlaceOfBirdAction({ state: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // history.push('education');
    signupUserAction({ ...signup })
      .then(() => history.push('/dashboard'))
      .catch(({ response }) => console.log(response));
  };

  console.log(signup);

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
        value={signup.email}
        onChange={handleChange}
        name="email"
        label="Correo"
      />

      <TextField
        onChange={handleChange}
        password
        name="password"
        label="Contraseña"
        value={signup.password} />

      <DatePicker
        format="LL"
        label="Fecha de nacimiento"
        onChange={handleDate}
        name="birthDate"
        value={basicData.birthDate} />

      <TextField
        onChange={handleChange}
        label="Lugar de nacimiento"
        name="placeOfBirth"
        value={basicData.placeOfBirth.addressName} />

      <SelectField
        value={basicData.placeOfBirth.state}
        onChange={handleState}
        name="state"
        label="Estado"
        options={states}
      />

      <Label>Especialidad</Label>
      <div className="check-box">
        <Group name="speciality" onChange={handleChange}>
          <Radio value="Medicina Interna">
            Medicina Interna
          </Radio>
          <Radio value="Gastroenterología">
            Gastroenterología
          </Radio>
          <Radio value="Cirujano">
            Cirujano
          </Radio>
          <Radio value="Motilidad" >
            Motilidad
          </Radio>
          <Radio value="Endoscopia">
            Endoscopia
          </Radio>
          <Radio value="Otra">
            Otra
          </Radio>
        </Group>
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
  connect(
    mapStateToProps,
    {
      writeSignupAction,
      writeBasicDataAction,
      writePlaceOfBirdAction,
      signupUserAction,
    },
  )(GeneralDataForm),
);
