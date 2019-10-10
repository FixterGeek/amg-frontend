import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { makePaymentAction } from '../../store/ducks/paymentsDuck';
import { subscribeUserToEventAction } from '../../store/ducks/userDuck';
import useSweet from '../../hooks/useSweetAlert';
import PaymentCardForm from './reusables/PaymentCardForm';
import ContainerItem from '../reusables/ContainerItem';
import Spinner from '../reusables/Spinner';

function PaymentEvent({
  history, user, makePaymentAction,
  userFetching, userStatus,
  paymentFetching, paymentStatus, subscribeUserToEventAction,
}) {
  const { infoAlert, errorAlert } = useSweet();
  const { location } = history;

  const [event, setEvent] = useState({
    cost: 100,
    title: null,
  });

  useEffect(() => {
    if (paymentStatus === 'error') {
      errorAlert({ text: 'No fue posible completar el pago' });
    }
    if (paymentStatus === 'success') {
      subscribeUserToEventAction(event._id)
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
        />
      </ContainerItem>
    </div>
  );
}

function mapStateToProps({ user, payment }) {
  return {
    user,
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
