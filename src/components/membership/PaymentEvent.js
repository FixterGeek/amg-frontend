import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { makePaymentAction } from '../../store/ducks/paymentsDuck';
import useSweet from '../../hooks/useSweetAlert';
import PaymentCardForm from './reusables/PaymentCardForm';
import ContainerItem from '../../atoms/DashboardContainerItem';

function PaymentEvent({
  history, user, makePaymentAction,
}) {
  const { infoAlert, errorAlert } = useSweet();
  const { location } = history;

  const [event, setEvent] = useState({
    cost: 100,
    title: null,
  });

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

  const handleChange = (data) => {
    //console.log(data);
  }

  const handleSubmit = (data) => {
    // console.log(data);
    makePaymentAction({ ...data, user: user._id, eventId: event._id });
  };

  console.log(event)

  return (
    <div className="dashboard-container">
      <ContainerItem>
        <PaymentCardForm
          onChange={handleChange}
          onSubmit={handleSubmit}
          amount={event.cost}
          concept={`Evento - ${event.title}`}
        />
      </ContainerItem>
    </div>
  );
}

function mapStateToProps({ user }) {
  return {
    user,
  }
}

export default connect(
  mapStateToProps, {
    makePaymentAction,
  }
)(PaymentEvent);
