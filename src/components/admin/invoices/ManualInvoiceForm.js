import React, { useState } from 'react';

import { Typography, Form } from 'antd';

import ContainerItem from '../../reusables/ContainerItem';
import TextField from '../../reusables/TextField';
import SelectField, { OptionSelect } from '../../reusables/SelectField';

import estados from '../estados.json'

function ManualInvoiceForm() {
  const { Title } = Typography;

  const [state, setState] = useState({
    rfc: null,
    street: null,
    colony: null,
    zipCode: null,
    city: null,
    state: null,
    concept: null,
    amount: null,
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState(s => ({ ...s, [name]: value }));
  };

  return (
    <section>
      <ContainerItem>
        <Title>Factutar</Title>
      </ContainerItem>
      <ContainerItem>
        <Form>
          <TextField
            onChange={handleChange}
            value={state.rfc}
            name="rfc"
            label="RFC"
          />
          <TextField
            onChange={handleChange}
            value={state.street}
            name="stree"
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
            value={state.amount}
            name="amount"
            label="Monto"
          />
        </Form>
      </ContainerItem>
    </section>
  );
}

export default ManualInvoiceForm;
