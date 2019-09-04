import React, { useState } from 'react';

import { Form, Typography } from 'antd';

import useSweet from '../../../hooks/useSweetAlert';
import { uploadFile } from '../../../tools/firebaseTools';
import TextField from '../../reusables/TextField';
import ImagePicker from '../../reusables/ImagePicker';
import DatePickerField from '../../reusables/DatePickerField';
import SelectField, { OptionSelect } from '../../reusables/SelectField';
import CheckboxField from '../../reusables/CheckboxField';
import PasswordField from '../../reusables/PasswordField';
import ContainerItem from '../../reusables/ContainerItem';
import Button from '../../reusables/Button';
import estados from '../../admin/estados.json';

function SignupGeneralDataForm({ user, dispatch }) {
  const { Title } = Typography;

  const { errorAlert } = useSweet();
  const checks = [
    'Gastroenterología', 'Endoscopia', 'Motilidad', 'Medicina Interna', 'Cirujano', 'Otras',
  ]

  const generalsState = {
    email: null,
    password: null,
    photoProfile: null,
    basicData: {
      name: null,
      dadSurname: null,
      momSurname: null,
      birthDate: null,
      photoURL: null,
      speciality: null,
      placeOfBirth: {
        addressName: null,
      },
      address: {
        state: null,
      },
    },
    membershipStatus: 'Free',
  }

  const [generals, setGeneral] = useState(generalsState);

  const handleChange = ({ target }) => {
    const { value, name } = target;

    if (name === 'password' || name === 'email' || name === 'photoProfile') setGeneral({ ...generals, [name]: value })
    else if (name === 'state') setGeneral({
      ...generals,
      basicData: {
        ...generals.basicData,
        address: { ...generals.basicData.address, [name]: value }
      }
    });
    else if (name === 'addressName') setGeneral({
      ...generals,
      basicData: {
        ...generals.basicData,
        placeOfBirth: { ...generals.basicData.placeOfBirth, [name]: value }
      }
    });
    else setGeneral({ ...generals, basicData: { ...generals.basicData, [name]: value } })
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    uploadFile('generic/users', generals.photoProfile)
      .then(url => {
        const userData = generals;
        userData.basicData.photoURL = url;
        dispatch(userData);
      })
      .catch((error) => {
        errorAlert({});
      });
  }

  console.log(generals);

  return (
    <Form onSubmit={handleSubmit}>
      <ContainerItem>
        <Title>Datos generales</Title>
      </ContainerItem>
      <ImagePicker
        onChange={file => handleChange({ target: { name: 'photoProfile', value: file } })}
        url={generals.basicData.photoURL}
        label="Foto de perfil"
      />
      <TextField
        onChange={handleChange}
        name="name"
        label="Nombre"
        value={generals.basicData.name}
      />
      <TextField
        onChange={handleChange}
        label="Apellido paterno"
        name="dadSurname"
        value={generals.basicData.dadSurname}
      />
      <TextField
        onChange={handleChange}
        label="Apellido materno"
        name="momSurname"
        value={generals.basicData.momSurname}
      />
      <TextField
        onChange={handleChange}
        label="Correo"
        name="email"
        value={generals.email}
      />
      <PasswordField
        onChange={handleChange}
        label="Contraseña"
        name="password"
        value={generals.password}
      />
      <DatePickerField
        onChange={moment => handleChange({ target: { name: 'birthDate', value: moment.toString() }})}
        label="Fecha de nacimiento"
        value={generals.basicData.birthDate}
      />
      <TextField
        onChange={handleChange}
        label="Lugar de nacimiento"
        name="addressName"
        value={generals.basicData.placeOfBirth.addressName}
      />
      <SelectField
        onChange={value => handleChange({ target: { name: 'state', value } })}
        value={generals.basicData.address.state}
        label="Estado" >
        {
          Object.keys(estados).map((key) => (
            <OptionSelect key={key} value={estados[key]}>
              { estados[key] }
            </OptionSelect>
          ))
        }
      </SelectField>
      <CheckboxField
        onChange={values => handleChange({ target: { name: 'speciality', value: values[0] } })}
        label="Especialidad"
        value={generals.basicData.speciality}
        checks={checks}
      />

      <Button htmlType="submit" width="100%">
        Siguiente
      </Button>
    </Form>
  )
}

export default SignupGeneralDataForm;
