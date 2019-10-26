import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { makePaymentAction } from '../../store/ducks/paymentsDuck';
import { subscribeUserToEventAction } from '../../store/ducks/userDuck';
import useSweet from '../../hooks/useSweetAlert';
import PaymentCardForm from './reusables/PaymentCardForm';
import ContainerItem from '../reusables/ContainerItem';
import Spinner from '../reusables/Spinner';
import OxxoOrder from './reusables/OxxoOrder';
import PaymentType from './reusables/PaymentType';

function PaymentEvent({
  history, user, makePaymentAction,
  userFetching, userStatus,
  paymentFetching, paymentStatus, subscribeUserToEventAction,
  userPhone,
}) {
  const { infoAlert, errorAlert } = useSweet();
  const { location } = history;

  const [event, setEvent] = useState({
    cost: 100,
    title: null,
  });

  const [paymentType, setPaymentType] = useState(null);
  const [oxxoOrder, setOxxoOrder] = useState(null);

  useEffect(() => {
    if (paymentStatus === 'error') {
      errorAlert({ text: 'No fue posible completar el pago' });
    }
    if (paymentStatus === 'paid') {
      subscribeUserToEventAction(event._id).then(() => history.push('/dashboard/events'))
    }
  }, [paymentStatus]);

  useEffect(() => {
    if (userStatus === 'error') {
      errorAlert({ title: 'No fue posible realizar la inscripción al evento.' })
    }
    if (userStatus === 'success') {
      history.push('/dashboard/perfil');
    }
  }, [userStatus])

  useEffect(() => {
    if (user.userStatus !== 'Aprobado') {
      infoAlert({
        title: 'Lamentamos las molestias!', text: 'Tu cuanta aun no a sido aprobada.',
      })
      history.push('/dashboard/settings')
    }
  }, [user]);

  useEffect(() => {
    setEvent({ ...event, ...location.state })
  }, [location]);

  useEffect(() => {
    if (paymentType === 'oxxo') makePaymentAction({
        price: event.cost,
        isOxxoPayment: true,
        phone: userPhone, 
      },'subscription' )
      .then(({ conektaOrder }) => setOxxoOrder(conektaOrder));
  }, [paymentType]);

  if (oxxoOrder) return <OxxoOrder oxxoOrder={oxxoOrder} />

  if (!paymentType || paymentType === 'oxxo') return <PaymentType
      onChange={type => setPaymentType(type)}
      loading={paymentFetching}
      phone={userPhone || null}
    />


  const handleSubmit = (data) => {
    makePaymentAction({ ...data, user: user._id, eventId: event._id });
  };

  return (
    <div className="dashboard-container">
      <ContainerItem style={{ position: 'relative' }}>
        { userFetching || paymentFetching ? <Spinner /> : null }
        <PaymentCardForm
          onSubmit={handleSubmit}
          amount={event.cost}
          concept={`Evento - ${event.title}`}
          phone={ userPhone || null }
        />
      </ContainerItem>
    </div>
  );
}

function mapStateToProps({ user, payment: { payment } }) {
  return {
    user,
    userPhone: user.basicData.phone,
    userFetching: user.fetching,
    useStatus: user.status,
    paymentFetching: payment.fetching,
    paymentStatus: payment.status,
  }
}

export default connect(
  mapStateToProps, {
    makePaymentAction,
    subscribeUserToEventAction,
  }
)(PaymentEvent);
