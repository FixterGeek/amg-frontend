import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Typography } from 'antd';

import {
  populateInvoicesAction,
  resetInvoicesStatus,
  populateExternalInvoices,
} from '../../../store/ducks/invoicesDuck';
import ContainerItem from '../../reusables/ContainerItem';
import Button from '../../reusables/Button';
import InvoicesTable from './reusables/InvoicesTable';
import Spinner from '../../reusables/Spinner';

function Invoices({
  invoices, noInvoices, populateInvoicesAction,
  invoicesFetching, invoicesStatus, resetInvoicesStatus,
  populateExternalInvoices,
}) {
  const { Title } = Typography;

  useEffect(() => {
    if (!invoices[0] && !noInvoices) populateInvoicesAction();
    populateExternalInvoices();
  }, [])

  useEffect(() => {
    if (invoicesStatus !== null) resetInvoicesStatus();
  }, [invoicesStatus]);

  return (
    <section className="admin-invoices">
      { invoicesFetching && <Spinner fullScrren /> }
      <ContainerItem className="admin-invoices-title">
        <Title style={{ display: 'inline-blocks', flexGrow: 1 }}>Facturas</Title>
        <Link to="/admin/invoices/fiscals">
          <Button marginTop="0px" line width="200px">
            Datos fiscales
          </Button>
        </Link>
        <Link to="/admin/invoices/crear">
          {/* <Button marginTop="0px" line width="200px" style={{ marginLeft: '32px' }}>
            Pagos para facturar
          </Button> */}
          <Button marginTop="0px" line width="200px" style={{ marginLeft: '32px' }}>
            Generar factura
          </Button>
        </Link>
      </ContainerItem>
      <ContainerItem>
        <InvoicesTable invoices={ invoices && invoices.data ? invoices.data.invoices : [] } />
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
    populateExternalInvoices,
  }
)(Invoices);
