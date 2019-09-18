import React from 'react';

import { Typography, Form } from 'antd';

import ContainerItem from '../../reusables/ContainerItem';
import TextField from '../../reusables/TextField';
import SelectField, { OptionSelect } from '../../reusables/SelectField';
import Button from '../../reusables/Button';
import estados from '../estados.json';

function AdminInvoceForm() {
  const { Title } = Typography;

  return (
    <section>
      <ContainerItem>
        <Title>Nueva factura</Title>
        <Form>
          <TextField label="RFC" />
          <TextField label="Dirección" />
          <TextField label="Colonia" />
          <TextField label="Código postal" />
          <TextField label="Ciudad" />
          <TextField label="Colonia" />
          <SelectField label="Estado">
            {
              Object.keys(estados).map(key => (
                <OptionSelect key={key} value={estados[key]}>
                  { estados[key] }
                </OptionSelect>
              ))
            }
          </SelectField>
          <Button width="100%">
            Facturar
          </Button>
        </Form>
      </ContainerItem>
    </section>
  );
}

export default AdminInvoceForm;
