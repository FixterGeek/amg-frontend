import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  subscribeUserToActivityAction,
  subscribeUserToEventAction
} from '../../../store/ducks/userDuck';
import Button from '../../reusables/Button';

function SubscribeButton({
  payable, user = {}, eventObject = {},
  subscribeUserToActivityAction, subscribeUserToEventAction,
  assistedEvents, activityObject = {}, assistedActivities
}) {
  const { membershipStatus = 'Veterano', useStatus } = user;
  const userPays = membershipStatus === 'Socio' || membershipStatus === 'Veterano' ?
    false : membershipStatus === 'Free' || membershipStatus === 'Residente'

  console.log(userPays)

  if (assistedEvents.includes(eventObject._id) || assistedActivities.includes(activityObject._id)) {
    return (
      <Button disabled bgColor="green" width="100%">
        Inscrito
      </Button>
    );
  }

  if (payable && userPays) return (
    <Link
      className="events-reusables-subscribe-link"
      to={{
        pathname: `/dashboard/payment/event/${eventObject._id}`,
        state: eventObject,
      }} >
      Pagar por este evento
    </Link>
  )

  if (payable && !userPays) return (
    <Button
      onClick={() => subscribeUserToEventAction(eventObject._id)}
      width="100%"
    >
      Inscribirme
    </Button>
  );

  return (
    <Button
      onClick={() => subscribeUserToActivityAction(activityObject._id)}
      width="100%"
    >
      Inscribirme a la actividad
    </Button>
  )
}

function mapStateToProps({ user }) {
  return {
    user,
    assistedEvents: user.assistedEvents,
    assistedActivities: user.assistedActivities,
  }
}

export default connect(
  mapStateToProps,{
    subscribeUserToActivityAction,
    subscribeUserToEventAction,
  }
)(SubscribeButton);
