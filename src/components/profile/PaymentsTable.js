import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { Table } from 'antd';

import { populatePaymentsAction } from '../../store/ducks/paymentsDuck';

function PaymentsTable({
  payments, userId, populatePaymentsAction,
  noPayments,
}) {
  const columns = [
    {
      title: 'Concepto',
      dataIndex: 'concept',
    },
    {
      title: 'Monto',
      dataIndex: 'amount',
    },
    {
      title: 'Fecha',
      render: (text, record) => (
        <span>{ moment(record.updatedAt).format('DD/MM/YYYY') }</span>
      )
    }
  ];

  useEffect(() => {
    if (!payments[0] && !noPayments) populatePaymentsAction(userId);
  }, [payments]);

  return (
    <div className="profile-payments-table">
      <Table
        dataSource={payments}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey="_id"
      />
    </div>
  );
}

function mapSateToProps({ payment, user }) {
  return {
    payments: payment.array,
    noPayments: payment.noData,
    userId: user._id,
  };
}

export default connect(
  mapSateToProps, {
    populatePaymentsAction,
  },
)(PaymentsTable);
