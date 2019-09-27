import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Typography } from 'antd';

import { populateInvoicesAction } from '../../../store/ducks/invoicesDuck';
import ContainerItem from '../../reusables/ContainerItem';
import Button from '../../reusables/Button';
import InvoicesTable from './reusables/InvoicesTable';

function Invoices({
  invoicess, populateInvoicesAction,
}) {
  const { Title } = Typography;

  return (
    <section className="admin-invoices">
      <ContainerItem className="admin-invoices-title">
        <Title>Facturas</Title>
        <Link to="/admin/invoices/fiscals">
          <Button marginTop="0px">
            Datos fiscales
          </Button>
        </Link>
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

function mapStateToProps({ invoice }) {
  return {
    invoices: invoice.array,
  }
}

export default connect(
  mapStateToProps, {
    populateInvoicesAction,
  }
)(Invoices);
