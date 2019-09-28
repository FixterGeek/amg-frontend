import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { Table, Button as AntButton } from 'antd';

import {
  populateAdminPaymentsAction,
} from '../../../../store/ducks/paymentsDuck';
import {
  createInvoiceAction,
} from '../../../../store/ducks/invoicesDuck';
import Spinner from '../../../reusables/Spinner';
import PaymentStatus from './PaymentStatus';

function PaymentsList({
  payments, paymentsFetching, paymentsStatus,
  noPayments, invoiceFetching, invoiceStatus,
  /* ducks */
  populateAdminPaymentsAction, createInvoiceAction,
}) {
  const columns = [
    { title: 'Usuario', dataIndex: 'user' },
    { title: 'Concepto', dataIndex: 'concept' },
    { title: 'Monto', dataIndex: 'amount' },
    {
      title: 'Fecha', dataIndex: 'createdAt',
      render: text => (
        <span>{ moment(text).format('dddd D [ de ] MMMM [de] YYYY ') }</span>
      )
    },
    {
      title: 'Estado',
      render: (text, record) => (
        <PaymentStatus paidout={record.paid} />
      ),
    },
    {
      title: 'Acciones',
      render: (text, record) => (
        <AntButton htmlType="button" type="primary" size="small" onClick={() => createInvoiceAction(record._id)}>
          Facturar
        </AntButton>
      )
    }
  ];

  useEffect(() => {
    if (!payments[0] && !noPayments) populateAdminPaymentsAction();
  }, [])

  console.log(payments);

  return (
    <div>
      { paymentsFetching || invoiceFetching ? <Spinner fullScreen /> : null }
      <Table columns={columns} dataSource={payments} />
    </div>
  );
}

function mapStateToProps({ payment: { adminPayment: payment }, invoice }) {
  return {
    payments: payment.array,
    noPayments: payment.noData,
    paymentsFetching: payment.fetching,
    paymentsStatus: payment.status,
    invoiceFetching: invoice.fetching,
    invoiceStatus: invoice.status,
  };
}

export default connect(
  mapStateToProps, {
    populateAdminPaymentsAction,
    createInvoiceAction,
  }
)(PaymentsList);
