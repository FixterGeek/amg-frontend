import React, { useState } from 'react';

import { Form, Divider, Typography } from 'antd';

import ContainerItem from '../../reusables/ContainerItem';
import TextField from '../../reusables/TextField';
import DocumentField from '../../reusables/DocumentField';

function AdminInvoicesFiscalData() {
  const { Title } = Typography;

  const [state, setState] = useState({
    membershipSerie: null,
    membershipSerieFolio: null,
    membershipSerieDescription: null,
    eventSerie: null,
    eventSerieFolio: null,
    eventSerieDescription: null,
    privateNumber: null,
    certificate: null,
    key: null,
    rfc: null,
    name: null,
    regime: null,
    zipCode: null,
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({ ...state, [name]: value });
  }

  return (
    <ContainerItem>
      <Title>Certificados y series</Title>
      <ContainerItem>
        <Form>
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
            onFile={file => handleChange({ target: { name: 'certificate', value: file } })}
            file={state.certificate}
            label="Certificado"
            customTypes=".cer"
          />
          <DocumentField
            onFile={file => handleChange({ target: { name: 'certificate', value: file } })}
            file={state.key}
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
        </Form>
      </ContainerItem>
    </ContainerItem>
  );
}

export default AdminInvoicesFiscalData;
