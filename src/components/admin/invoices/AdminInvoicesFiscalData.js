import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import toFormData from 'object-to-formdata';

import { Form, Divider, Typography } from 'antd';

import {
  populateFiscalDataAction,
  resetInvoicesStatus,
} from '../../../store/ducks/invoicesDuck';
import useSweet from '../../../hooks/useSweetAlert';
import { dataFacturacion, getDataFacturacion } from '../../../services/invoicesServices';
import ContainerItem from '../../reusables/ContainerItem';
import TextField from '../../reusables/TextField';
import DocumentField from '../../reusables/DocumentField';
import Button from '../../reusables/Button';

import { uploadFile } from '../../../tools/firebaseTools';

function AdminInvoicesFiscalData({
  fiscalData, fiscalDataFetching, fiscalDataStatus,
  populateFiscalDataAction, resetInvoicesStatus,
}) {
  const { Title } = Typography;

  const { errorAlert } = useSweet();
  const [state, setState] = useState({
    membershipSerie: null,
    membershipSerieFolio: null,
    membershipSerieDescription: null,
    eventSerie: null,
    eventSerieFolio: null,
    eventSerieDescription: null,
    privateNumber: null,
    cer: null,
    key: null,
    rfc: null,
    name: null,
    regime: null,
    zipCode: null,
    _id: null,
    cerfile: null,
    keyfile: null,
  });

  useEffect(() => {
    if (fiscalData._id) setState({ ...state, ...fiscalData });
    else populateFiscalDataAction();
  }, [fiscalData])

  useEffect(() => {
    if (fiscalDataStatus === 'error') errorAlert({});
    if (fiscalDataStatus !== null) resetInvoicesStatus();
  }, [fiscalDataStatus]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({ ...state, [name]: value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    let cer = null;
    const key = null;
    if (state.cerfile) cer = await uploadFile('/fiscal-data/', state.cerfile).then(url => url);
    if (state.keyfile) cer = await uploadFile('/fiscal-data/', state.keyfile).then(url => url);

    console.log(cer, key);
    // const formData = toFormData({ ...state }, { nulls: true });
    // dataFacturacion(formData)
    //   .then((data) => console.log(data))
    //   .catch(error => console.log(error));
  }

  return (
    <ContainerItem>
      <Title>Certificados y series</Title>
      <ContainerItem>
        <Form onSubmit={handleSubmit}>
          <Title level={3}>Membresia</Title>
          <TextField
            onChange={handleChange}
            value={state.membershipSerie}
            label="Serie membresia"
            name="membershipSerie"
          />
          <TextField
            onChange={handleChange}
            value={state.membershipSerieFolio}
            label="Folio inicial membresia"
            name="membershipSerieFolio"
          />
          <TextField
            onChange={handleChange}
            value={state.membershipSerieDescription}
            label="Serie membresia (descripción)"
            name="membershipSerieDescription"
          />
          <Divider />
          <Title level={3}>Evento</Title>
          <TextField
            onChange={handleChange}
            value={state.eventSerie}
            label="Serie evento"
            name="eventSerie"
          />
          <TextField
            onChange={handleChange}
            value={state.eventSerieFolio}
            label="Folio inicial evento"
            name="eventSerieFolio"
          />
          <TextField
            onChange={handleChange}
            value={state.eventSerieDescription}
            label="Serie evento (descripción)"
            name="eventSerieDescription"
          />
          <Divider />
          <Title level={3}>Certificado</Title>

          <TextField
            onChange={handleChange}
            value={state.privateNumber}
            label="Clave privada"
            name="privateNumber"
          />
          <DocumentField
            onFile={file => handleChange({ target: { name: 'cerfile', value: file } })}
            url={state.cer}
            label="Certificado"
            customTypes=".cer"
          />
          <DocumentField
            onFile={file => handleChange({ target: { name: 'keyfile', value: file } })}
            url={state.key}
            label="Llave"
            customTypes=".key"
          />

          <Divider />
          <Title level={3}>Datos fiscales</Title>

          <TextField
            onChange={handleChange}
            value={state.rfc}
            label="RFC"
            name="rfc"
          />
          <TextField
            onChange={handleChange}
            value={state.name}
            label="Nombre/Razon social"
            name="name"
          />
          <TextField
            onChange={handleChange}
            value={state.regime}
            label="Régimen fiscal"
            name="regime"
          />
          <TextField
            onChange={handleChange}
            value={state.zipCode}
            label="Lugar de Expedición (código postal del lugar de expedición)"
            name="zipCode"
          />

          <Button width="100%" htmlType="submit">
            Guardar
          </Button>
        </Form>
      </ContainerItem>
    </ContainerItem>
  );
}

function mapStateToProps({ invoice }){
  return {
    fiscalData: invoice.fiscalData,
    fiscalDataFetching: invoice.fetching,
    fiscalDataStatus: invoice.status,
  };
}

export default connect(
  mapStateToProps, {
    populateFiscalDataAction,
    resetInvoicesStatus,
  }
)(AdminInvoicesFiscalData);
