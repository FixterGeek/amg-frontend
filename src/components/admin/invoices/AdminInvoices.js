import React from 'react';
import { Link } from 'react-router-dom';

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
        <Link to="/admin/invoices/edit">
          <Button marginTop="0px">
            Crear factura ✚
          </Button>
        </Link>
      </ContainerItem>
      <ContainerItem>
        <InvoicesTable />
      </ContainerItem>
    </section>
  );
}

export default Invoices;
