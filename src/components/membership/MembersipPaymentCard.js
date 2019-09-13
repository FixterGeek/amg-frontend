import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import useSweet from '../../hooks/useSweetAlert';
import { makePaymentAction, resetPaymentStatus } from '../../store/ducks/paymentsDuck';
import PaymentCardForm from './reusables/PaymentCardForm';
import ContainerItem from '../reusables/ContainerItem';
import Spinner from '../reusables/Spinner';

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


  useEffect(() => {
    if (paymentStatus === 'error') {
      errorAlert({ title: 'No fue posible procesar el pago' });
      resetPaymentStatus();
    }
    if (paymentStatus === 'success') {
      successAlert({ title: `Has adquirido el plan ${type}` });
      resetPaymentStatus();
      history.push('/dashboard/perfil');
    }
  }, paymentStatus);

  const handleForm = (data) => {
    const paymentData = data;
    paymentData.user = userId;
    paymentData.price = amount;
    paymentData.subscriptionType = type;

    makePaymentAction(paymentData);
  };

  return (
    <div className="dashboard-container">
      <ContainerItem style={{ position: 'relative' }}>
        { paymentFetching && <Spinner /> }
        <PaymentCardForm
          onSubmit={handleForm}
          concept={`Plan - ${type}`}
          amount={amount}
        />
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
