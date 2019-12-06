import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Typography, Form } from 'antd';

import { makeManualInvoice } from '../../../store/ducks/invoicesDuck';
import ContainerItem from '../../reusables/ContainerItem';
import TextField from '../../reusables/TextField';
import SelectField, { OptionSelect } from '../../reusables/SelectField';
import Button from '../../reusables/Button';
import Spinner from '../../reusables/Spinner';

import estados from '../estados.json'

function ManualInvoiceForm({
  makeManualInvoice, fetching, history,
}) {
  const { Title } = Typography;

  const initialState = {
    rfc: null,
    street: null,
    colony: null,
    zipCode: null,
    city: null,
    state: null,
    fullName: null,
    concept: null,
    amountNoIva: null,
    paymentType: null,
    paymentMethod: 'card',
  }

  const [state, setState] = useState(initialState);

  const allIsFill = state.rfc && state.street && state.colony && state.zipCode &&
    state.city && state.amountNoIva && state.paymentType && state.paymentMethod;

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState(s => ({ ...s, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const address = `${state.street}, ${state.colony}, ${state.city}, ${state.state}, ${state.zipCode}.`
    makeManualInvoice({ ...state, address })
      .then(data => {
        setState(initialState);
        history.push('/admin/invoices');
      });
  }

  return (
    <section>
      {
        fetching && <Spinner fullScrren />
      }
      <ContainerItem>
        <Title>Facturar</Title>
      </ContainerItem>
      <ContainerItem>
        <Form onSubmit={handleSubmit}>
          <TextField
            onChange={handleChange}
            value={state.rfc}
            name="rfc"
            label="RFC"
          />
          <TextField
            onChange={handleChange}
            value={state.fullName}
            name="fullName"
            label="Nombre completo"
          />
          <TextField
            onChange={handleChange}
            value={state.street}
            name="street"
            label="Dirección"
          />
          <TextField
            onChange={handleChange}
            value={state.colony}
            name="colony"
            label="Colonia"
          />
          <TextField
            onChange={handleChange}
            value={state.zipCode}
            name="zipCode"
            label="Código postal"
          />
          <TextField
            onChange={handleChange}
            value={state.city}
            name="city"
            label="Ciudad"
          />
          <SelectField
            onChange={value =>  handleChange({ target: { name: 'state', value } })}
            value={state.state}
            label="Estado"
          >
            {
              Object.keys(estados).map((key, index) => {
                return (
                  <OptionSelect key={`estado-${index}`} value={estados[key]} >
                    { estados[key] }
                  </OptionSelect>
                )
              })
            }
          </SelectField>
          <TextField
            onChange={handleChange}
            value={state.concept}
            name="concept"
            label="Concepto"
          />
          <TextField
            onChange={handleChange}
            value={state.amountNoIva}
            name="amountNoIva"
            label="Monto sin IVA"
          />
          <SelectField
            onChange={value =>  handleChange({ target: { name: 'paymentType', value } })}
            value={state.paymentType}
            label="Tipo de pago"
          >
            <OptionSelect value="Subscription">Membresia</OptionSelect>
            <OptionSelect value="Event">Evento</OptionSelect>
            <OptionSelect value="Course">Curso</OptionSelect>
          </SelectField>
          <SelectField
            onChange={value =>  handleChange({ target: { name: 'paymentMethod', value } })}
            value={state.paymentMethod}
            label="Método de pago"
          >
            <OptionSelect value="card">Tarjeta</OptionSelect>
            <OptionSelect value="oxxo">OXXO</OptionSelect>
          </SelectField>
          <Button width="100%" disabled={!allIsFill} htmlType="submit">
            Facturar
          </Button>
        </Form>
      </ContainerItem>
    </section>
  );
}

function mapStateToProps({ invoice }) {
  return {
    fetching: invoice.fetching,
  }
}

export default connect(
  mapStateToProps, {
    makeManualInvoice,
  }
)(ManualInvoiceForm);
