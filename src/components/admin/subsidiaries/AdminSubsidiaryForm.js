import React, { useState } from 'react';
import { connect } from 'react-redux';
import toFormData from 'object-to-formdata';

import { Typography, Form } from 'antd';

import { updateUserAction } from '../../../store/ducks/userDuck';
import ContainerItem from '../../reusables/ContainerItem';
import TextField from '../../reusables/TextField';
import SelectField, { OptionSelect } from '../../reusables/SelectField';
import ImagePicker from '../../reusables/ImagePicker';
import Button from '../../reusables/Button';
import Spinner from '../../reusables/Spinner';

import banks from './reusables/banks.json';
import states from '../estados.json';

function AdminSubsidiaryForm({
  user, history, updateUserAction,
  fetching, status,
}) {
  const { Title } = Typography;
  const { location: historyLocation } = history;

  const [subData, setSubData] = useState({
    _id: null,
    basicData: {},
    fiscalData: {
      address: {}
    },
    bankData: {},
    ...user,
  });

  const { basicData } = subData;

  const handleChange = ({ target }, sub, subSub) => {
    const { name, value } = target;
    if (sub) setSubData(state => ({ ...state, [sub]: { ...state[sub], [name]: value } }));
    if (subSub) setSubData(state => ({
      ...state,
      [sub]: {
        ...state[sub],
        [subSub]: { ...state[sub][subSub], [name]: value }
      }
    }));
    else setSubData(state => ({ ...state, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = subData;
    delete userData._id;
    const formData = toFormData({
      basicData: userData.basicData,
      fiscalData: userData.fiscalData,
      bankData: userData.bankData,
      photo: userData.photo || null,
    }, { nulls: true });

    updateUserAction(formData);
  };

  console.log(subData);

  return (
    <section>
      { fetching && <Spinner fullScrren /> }
      <ContainerItem>
        <Title>{ basicData.name }</Title>
      </ContainerItem>
      <Form onSubmit={handleSubmit}>
        <ImagePicker
          onChange={file => handleChange({ target: { name: 'photo', value: file } })}
          url={subData.basicData.photoURL}
        />
        <Title level={4}>Datos de contacto</Title>
        <TextField
          value={subData.email}
          disabled
          label="Correo electrónico"
        />
        <TextField
          onChange={event => handleChange(event, 'basicData')}
          value={subData.basicData.phone}
          name="phone"
          label="Número telefonico"
        />

        <Title level={4}>Datos bancarios</Title>
        <TextField
          onChange={event => handleChange(event, 'bankData')}
          value={subData.bankData.clabe}
          name="clabe"
          label="CLABE interbancaria"
        />
        <TextField
          onChange={event => handleChange(event, 'bankData')}
          value={subData.bankData.accountNumber}
          name="accountNumber"
          label="Número de cuenta"
        />
        <SelectField
          onChange={value => handleChange({ target: { name: 'bank', value }}, 'bankData')}
          value={subData.bankData.bank}
          label="Entidad bancaria" >
          {
            Object.keys(banks).map(key => (
              <OptionSelect key={key} value={banks[key][0]}>
                { banks[key][0] }
              </OptionSelect>
            ))
          }
        </SelectField>
        <Title level={4}>DatosFiscales</Title>
        <TextField
          onChange={event => handleChange(event, 'fiscalData')}
          value={subData.fiscalData.rfc}
          name="rfc"
          label="RFC"
        />
        <TextField
          onChange={event => handleChange(event, 'fiscalData', 'address')}
          value={subData.fiscalData.address.street}
          name="street"
          label="Dirección"
        />
        <TextField
          onChange={event => handleChange(event, 'fiscalData', 'address')}
          value={subData.fiscalData.address.colony}
          name="colony"
          label="Colonia"
        />
        <TextField
          onChange={event => handleChange(event, 'fiscalData', 'address')}
          value={subData.fiscalData.address.zipCode}
          name="zipCode"
          label="Código postal"
        />
        <TextField
          onChange={event => handleChange(event, 'fiscalData', 'address')}
          value={subData.fiscalData.address.city}
          name="city"
          label="Ciudad"
        />
        <SelectField
          onChange={value => handleChange({ target: { name: 'state', value }}, 'fiscalData', 'address')}
          value={subData.fiscalData.address.state}
          label="Estado" >
          {
            Object.keys(states).map(key => (
              <OptionSelect key={key} value={states[key]}>
                { states[key] }
              </OptionSelect>
            ))
          }
        </SelectField>
        <Button width="100%" htmlType="submit">
          Actualizar Datos
        </Button>
      </Form>
    </section>
  );
}

function mapStateToProps({ user }) {
  return {
    user,
    fetching: user.fetching,
    status: user.status,
  }
}

export default connect(
  mapStateToProps, {
    updateUserAction,
  },
)(AdminSubsidiaryForm);
