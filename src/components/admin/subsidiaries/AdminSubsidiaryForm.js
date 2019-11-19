import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Typography, Form } from 'antd';

import {
  createOrUpdateSubsidiary,
  workingOn,
  setWorkingOn,
  resetWorkingOn,
  populateSubsidiaries,
} from '../../../store/ducks/subsidiaryDuck';
import ContainerItem from '../../reusables/ContainerItem';
import TextField from '../../reusables/TextField';
import SelectField, { OptionSelect } from '../../reusables/SelectField';
import ImagePicker from '../../reusables/ImagePicker';
import Button from '../../reusables/Button';
import Spinner from '../../reusables/Spinner';
import FormManager from '../reusables/CreateAndUpdateManager';

import banks from './reusables/banks.json';
import states from '../estados.json';

function AdminSubsidiaryForm({
  user, working, createOrUpdateSubsidiary,
  workingOn, history = {}, match = {},
  setWorkingOn, subsidiaries, noSubsidiaries,
  populateSubsidiaries, resetWorkingOn,
  status,
}) {
  const { Title } = Typography;
  const { location = {} } = history;
  const { pathname = '' } = location;
  const { params = {} } = match;

  useEffect(() => {
    if (!subsidiaries[0] && !noSubsidiaries) populateSubsidiaries();
    if (subsidiaries[0] && params.id) setWorkingOn(subsidiaries.filter(s => s._id === params.id)[0]);
  }, [subsidiaries]);

  // console.log(line);

  return (
    <section>
      <FormManager
        isModal={pathname.split('/').pop() !== 'edit'}
        modalOpenText="Crear Filial"
        createAndUpdateAction={createOrUpdateSubsidiary}
        payloadData={working}
        successClose
        errorClose
        autoResetFromClose
        status={status}
        onModalClose={c => c ? resetWorkingOn() : null}
        lineButton
      >
        <Form>
          <ImagePicker
            onChange={file => workingOn(working, 'photoFile', file)}
            label="Foto/Logo de la filial"
            url={working.photoURL || null}
          />
          <Title level={4}>Filial de</Title>
          <SelectField
            onChange={value => workingOn(working, 'state', value)}
            value={working.state}
            label="Filial para el estado de:" >
            {
              Object.keys(states).map(key => (
                <OptionSelect key={key} value={states[key]}>
                  { states[key] }
                </OptionSelect>
              ))
            }
          </SelectField>

          <Title level={4}>Datos de contacto</Title>
          <TextField
            onChange={({ target: { value } }) => workingOn(working, 'fiscalData.email', value)}
            value={working.fiscalData.email}
            label="Correo electrónico"
          />
          <TextField
            onChange={({ target: { value } }) => workingOn(working, 'fiscalData.phone', value)}
            value={working.fiscalData.phone}
            label="Número telefonico"
          />

          <Title level={4}>Datos bancarios</Title>
          <TextField
            onChange={({ target: { value } }) => workingOn(working, 'bankData.CLABE', value)}
            value={working.bankData.CLABE}
            label="CLABE interbancaria"
          />
          <TextField
            onChange={({ target: { value } }) => workingOn(working, 'bankData.accountNumber', value)}
            value={working.bankData.accountNumber}
            label="Número de cuenta"
          />
          <SelectField
            onChange={value => workingOn(working, 'bankData.bank', value)}
            value={working.bankData.bank}
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
            onChange={({ target: { value } }) => workingOn(working, 'businessName', value)}
            value={working.businessName}
            label="Razón social"
          />
          <TextField
            onChange={({ target: { value } }) => workingOn(working, 'fiscalData.rfc', value)}
            value={working.fiscalData.rfc}
            label="RFC"
          />
          <TextField
            onChange={({ target: { value } }) => workingOn(working, 'fiscalData.address.street', value)}
            value={working.fiscalData.address.street}
            label="Dirección"
          />
          <TextField
            onChange={({ target: { value } }) => workingOn(working, 'fiscalData.address.colony', value)}
            value={working.fiscalData.address.colony}
            label="Colonia"
          />
          <TextField
            onChange={({ target: { value } }) => workingOn(working, 'fiscalData.address.zipCode', value)}
            value={working.fiscalData.address.zipCode}
            label="Código postal"
          />
          <TextField
            onChange={({ target: { value }}) => workingOn(working, 'fiscalData.address.city', value)}
            value={working.fiscalData.address.city}
            label="Ciudad"
          />
          <SelectField
            onChange={value => workingOn(working, 'fiscalData.address.state', value)}
            value={working.fiscalData.address.state}
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
            { working._id ? 'Actualizar datos' : 'Crear Filial' }
          </Button>
        </Form>
      </FormManager>
    </section>
  );
}

function mapStateToProps({ user, subsidiary }) {
  return {
    user,
    fetching: user.fetching || subsidiary.fetching,
    status: user.status || subsidiary.status,
    subsidiaryFetching: subsidiary.fetching,
    working: subsidiary.workingOn,
    subsidiaries: subsidiary.array,
    noSubsidiaries: subsidiary.noData,
  }
}

export default connect(
  mapStateToProps, {
    workingOn,
    createOrUpdateSubsidiary,
    setWorkingOn,
    populateSubsidiaries,
    resetWorkingOn,
  },
)(AdminSubsidiaryForm);
