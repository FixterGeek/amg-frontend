import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import useService from '../../hooks/services/useAmgService';
import useSweet from '../../hooks/useSweetAlert';
import PaymentCardForm from './reusables/PaymentCardForm';
import ContainerItem from '../../atoms/DashboardContainerItem';

function PaymentActivity({ history, user }) {
  const { infoAlert, errorAlert } = useSweet();
  const { location } = history;

  const [activity, setActivity] = useState({
    activityType: '',
    activityName: '',
    description: '',
    speaker: {},
    amgSpeaker: {},
    location: {
      street: '',
      colony: '',
      zipCode: '',
    },
    assistants: [],
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
    setActivity({ ...location.state })
  }, [location]);

  const handleChange = (data) => {
    console.log(data);
  }

  const handleSubmit = (data) => {
    console.log(data);
  };

  console.log(activity)

  return (
    <div className="dashboard-container">
      <ContainerItem>
        <PaymentCardForm
          onChange={handleChange}
          onSubmit={handleSubmit}
          amount={activity.cost}
          concept={`${activity.activityType} - ${activity.activityName}`}
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

export default connect(mapStateToProps)(PaymentActivity);
