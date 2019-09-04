import React from 'react';

import { Typography } from 'antd';

import ContainerItem from '../../reusables/ContainerItem';
import Button from '../../reusables/Button';
import InvoicesTable from './reusables/InvoicesTable';

function Invoices() {
  const { Title } = Typography;

  return (
    <section className="admin-invoices">
      <ContainerItem className="admin-invoices-title">
        <Title>Facturas</Title>
        <Button marginTop="0px" line>
          Crear factura ✚
        </Button>
      </ContainerItem>
      <ContainerItem>
        <InvoicesTable />
      </ContainerItem>
    </section>
  );
}

export default Invoices;
