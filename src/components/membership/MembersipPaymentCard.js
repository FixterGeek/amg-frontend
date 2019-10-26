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
import OxxoOrder from './reusables/OxxoOrder';

function MembershipPaymentCard({
  history, match, userId, userPhone,
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
  const [oxxoOrder, setOxxoOrder] = useState(null);


  useEffect(() => {
    if (paymentStatus === 'error') {
      errorAlert({ title: 'No fue posible procesar el pago' });
      resetPaymentStatus();
    }
  }, paymentStatus);

  useEffect(() => {
    if (paymentType === 'oxxo') makePaymentAction({
        price: amount,
        isOxxoPayment: true,
        phone: userPhone,
      },'subscription' )
      .then(({ conektaOrder }) => setOxxoOrder(conektaOrder));
  }, [paymentType]);

  const handleForm = (data) => {
    const paymentData = data;
    paymentData.user = userId;
    paymentData.price = amount;
    paymentData.subscriptionType = type;

    makePaymentAction(paymentData, 'subscription')
      .then(data => setPaidData({ ...data }));
  };

  if (oxxoOrder) return <OxxoOrder oxxoOrder={oxxoOrder} />

  if (!paymentType || paymentType === 'oxxo') return <PaymentType
      onChange={type => setPaymentType(type)}
      loading={paymentFetching}
      phone={userPhone}
    />

  if (paymentType === 'card') return (
    <div className="dashboard-container">
      <ContainerItem style={{ position: 'relative' }}>
        { paymentFetching && <Spinner fullScrren /> }
        <PaymentCardForm
          onSubmit={handleForm}
          concept={`Plan - ${type}`}
          amount={amount}
          paid={paidData.paid}
          phone={userPhone}
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

function mapSateToProps({ user, payment: { payment } }) {
  return {
    userId: user.id,
    userPhone: user.basicData.phone,
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
