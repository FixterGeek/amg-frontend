import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { Table, Tag } from 'antd';

import {
  populateSubsidiaryPayments,
} from '../../../../store/ducks/paymentsDuck';
import {
  populateSubsidiaries,
} from '../../../../store/ducks/subsidiaryDuck';

function PaymentsList({
  payments, subsidiaryId, subId,
  subsidiaries,
  populateSubsidiaryPayments,
  populateSubsidiaries,
}) {

  const colums = [
    {
      title: 'Fecha',
      render: (t, r) => (<span>{ moment(r.date).format('dddd[ ]DD[ de ]MMMM[ de ]YYYY') }</span>)
    },
    {
      title: 'Estado del pago',
      render: (t, r) => (!r.paid ? <Tag color="red">No Aprobado</Tag> : <Tag color="lime">Aprobado</Tag>)
    },
    {
      title: 'Filial',
      render: (t, r) => (<span>{r.filial}</span>)
    },
    {
      title: 'Acciones',
      render: (t, r) => <Link to={`/admin/filiales/${r.filial}/pagos/${r._id}`}>Ver detalles de pago</Link>
    }
  ];

  useEffect(() => {
    if (!payments[0] && payments[0] !== 'empty') populateSubsidiaryPayments(subsidiaryId || subId);
  }, [payments.length])

  console.log(payments);

  return (
    <Table columns={colums} dataSource={payments} />
  );
}

function mapStateToProps({ user, subsidiary, payment: { payment } }) {
  return {
    payments: payment.subsidiaryPayments,
    subsidiaries: subsidiary.array,
    subsidiaryId: user.filialAsAdmin || null,
    fetching: payment.fetching,
  };
}

export default connect(
  mapStateToProps, {
    populateSubsidiaryPayments,
    populateSubsidiaries,
  }
)(PaymentsList);
