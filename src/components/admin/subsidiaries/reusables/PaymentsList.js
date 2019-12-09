import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { Table, Tag, Avatar } from 'antd';

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
      render: (t, r) => (<span>{r.filial.state}</span>)
    },
    {
      title: 'Usuario(s)',
      render: (t, r) => (
        <div>
          {
            r.users.map(u => (
              <div style={{ display: 'flex',  alignItems: 'center', justifyContent: 'flex-start' }}>
                <Avatar
                  src={u.basicData.photoURL || 'https://firebasestorage.googleapis.com/v0/b/amgweb.appspot.com/o/reusables%2Fprofile_9.png?alt=media&token=be192ce4-34cd-440d-a898-632d13acb44a'}
                  style={{ backgroundColor: '#e8e8e8' }}
                />
                <div style={{ display: 'flex', flexFlow: 'column' }}>
                  <span style={{ marginLeft: 4 }}>
                    <strong>
                      {`${u.basicData.name} ${u.basicData.dadSurname}`}
                    </strong>
                  </span>
                  <span style={{ marginLeft: 4, fontSize: '0.8rem' }}>{u.email}</span>
                </div>
              </div>
            ))
          }
        </div>
      ),
    },
    {
      title: 'Acciones',
      render: (t, r) => <Link to={`/admin/filiales/${r.filial._id}/pagos/${r._id}`}>Ver detalles de pago</Link>
    }
  ];

  useEffect(() => {
    if (!payments[0] && payments[0] !== 'empty') populateSubsidiaryPayments(subsidiaryId || subId);
  }, [payments.length])

  return (
    <Table
      columns={colums}
      dataSource={payments[0] !== 'empty' ? payments.sort((a, b) => moment(b.date).diff(moment(a.date))) : []}
    />
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
