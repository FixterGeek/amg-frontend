import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Typography } from 'antd';

import {
  populateInvoicesAction,
  resetInvoicesStatus,
} from '../../../store/ducks/invoicesDuck';
import ContainerItem from '../../reusables/ContainerItem';
import Button from '../../reusables/Button';
import InvoicesTable from './reusables/InvoicesTable';

function Invoices({
  invoices, noInvoices, populateInvoicesAction,
  invoicesFetching, invoicesStatus, resetInvoicesStatus,
}) {
  const { Title } = Typography;

  useEffect(() => {
    if (!invoices[0] && !noInvoices) populateInvoicesAction();
  }, [])

  useEffect(() => {
    if (invoicesStatus !== null) resetInvoicesStatus();
  }, [invoicesStatus])

  console.log(invoicesStatus);

  return (
    <section className="admin-invoices">
      <ContainerItem className="admin-invoices-title">
        <Title>Facturas</Title>
        <Link to="/admin/invoices/fiscals">
          <Button marginTop="0px">
            Datos fiscales
          </Button>
        </Link>
        <Link to="/admin/invoices/payments">
          <Button marginTop="0px">
            Pagos para facturar
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
    noInvoices: invoice.noData,
    invoicesFetching: invoice.fetching,
    invoicesStatus: invoice.status,
  }
}

export default connect(
  mapStateToProps, {
    populateInvoicesAction,
    resetInvoicesStatus,
  }
)(Invoices);
