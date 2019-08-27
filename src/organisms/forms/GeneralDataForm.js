import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Radio, Spin } from 'antd';

import { storage } from '../../firebase';
import {
  writeSignupAction, writeBasicDataAction, writePlaceOfBirdAction,
  signupUserAction,
} from '../../store/ducks/signupDuck';
import { createUserAction } from '../../store/ducks/userDuck';
import TextField from '../../molecules/TextFields';
import SelectField from '../../molecules/SelectField';
import DatePicker from '../../molecules/DatePicker';
import AmgButton from '../../atoms/Button';
import Label from '../../atoms/data-entry/Label';
import UploadPhoto from '../../components/profile/reusables/UploadProfilePhoto';

import states from './estados.json';

function GeneralDataForm({
  history, signup, writeSignupAction,
  writeBasicDataAction, writePlaceOfBirdAction, signupUserAction,
  fetching,
  status,
  error,
  createUserAction,
}) {
  const { Group } = Radio;
  const { basicData } = signup;

  const [photoFile, setPhotoFile] = useState()

  useEffect(() => {
    if (status === "success") {
      history.push('/dashboard/events')
    }
  }, [status])
  //effect
  const handleChange = (event) => {
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
    if (photoFile) {
      storage.ref('general-users').child(photoFile.name).put(photoFile)
        .then(snap => snap.ref.getDownloadURL())
        .then(url => {
          createUserAction({ ...signup, basicData: { ...signup.basicData, photoURL: url } })
        })
    } else createUserAction({ ...signup })
  };


  if (fetching) return <Spin />
  return (
    <form
      className="signup-form"
      style={{ width: '400px' }}
      onSubmit={handleSubmit}
    >
      <UploadPhoto onFile={file => setPhotoFile(file)}/>

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
        optionFilterProp="children"
        showSearch
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
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

function mapStateToProps({ signup, user }) {
  return {
    signup: signup,
    status: user.status,
    fetching: user.fetching,
    error: user.error
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
      createUserAction,
    },
  )(GeneralDataForm),
);
