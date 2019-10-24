import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import useSweet from '../../hooks/useSweetAlert';
import { makePaymentAction, resetPaymentStatus } from '../../store/ducks/paymentsDuck';
import PaymentCardForm from './reusables/PaymentCardForm';
import ContainerItem from '../reusables/ContainerItem';
import Spinner from '../reusables/Spinner';
import Button from '../reusables/Button';
import PaymentType from './reusables/PaymentType';

function MembershipPaymentCard({
  history, match, userId,
  userFetching, userStatus, makePaymentAction,
  paymentFetching, paymentStatus, resetPaymentStatus,
}) {
  const { location = {} } = history;
  const { params = {} } = match;
  const { state = {} } = location;
  const { type } = params;
  const { amount } = state;
  const { errorAlert, successAlert } = useSweet();

  const [paidData, setPaidData] = useState({});
  const [paymentType, setPaymentType] = useState(null);


  useEffect(() => {
    if (paymentStatus === 'error') {
      errorAlert({ title: 'No fue posible procesar el pago' });
      resetPaymentStatus();
    }
    if (paymentStatus === 'success') {
      successAlert({ title: `Has adquirido el plan ${type}` });
      resetPaymentStatus();
      // history.push('/dashboard/perfil');
    }
  }, paymentStatus);

  const handleForm = (data) => {
    const paymentData = data;
    paymentData.user = userId;
    paymentData.price = amount;
    paymentData.subscriptionType = type;

    makePaymentAction(paymentData, 'subscription')
      .then(data => setPaidData({ ...data }));
  };

  if (!paymentType) return <PaymentType onChange={type => setPaymentType(type)} />

  if (paymentType === 'card') return (
    <div className="dashboard-container">
      <ContainerItem style={{ position: 'relative' }}>
        { paymentFetching && <Spinner /> }
        <PaymentCardForm
          onSubmit={handleForm}
          concept={`Plan - ${type}`}
          amount={amount}
          paid={paidData.paid}
        />
        { 
          paidData._id && paidData.paid ? (
            <Link to={{ pathname: `/dashboard/pagos/${paidData._id}/facturar`, state: paidData }}>
              <Button width="100%" htmlType="button">
                Facturar pago
              </Button>
            </Link>
          ) : null 
        }
      </ContainerItem>
    </div>
  );
}

function mapSateToProps({ user, payment }) {
  return {
    userId: user.id,
    userFetching: user.fetching,
    userStatus: user.status,
    paymentFetching: payment.fetching,
    paymentStatus: payment.status,
  };
}

export default connect(
  mapSateToProps, {
    makePaymentAction,
    resetPaymentStatus,
  },
)(MembershipPaymentCard);
