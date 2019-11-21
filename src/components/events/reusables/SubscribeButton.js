import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  subscribeUserToActivityAction,
  subscribeUserToEventAction
} from '../../../store/ducks/userDuck';
import Button from '../../reusables/Button';

function SubscribeButton({
  payable, user = {}, eventObject = {
    cost: {
      freeCost: 0,
      residentCost: 0,
      socioCost: 0,
    }
  },
  subscribeUserToActivityAction, subscribeUserToEventAction,
  assistedEvents, activityObject = {}, assistedActivities
}) {
  console.log(eventObject);
  const { membershipStatus = 'Veterano', userStatus } = user;
  let userPays = membershipStatus === 'Socio' && eventObject.cost.socioCost > 0;
    if (membershipStatus === 'Residente' && (eventObject.cost && eventObject.cost.residentCost > 0)) userPays = true;
    if (membershipStatus === 'Free' && ( eventObject.cost && eventObject.cost.freeCost > 0)) userPays = true;
    if (membershipStatus === 'Veterano') userPays = false;

  if (userStatus !== 'Aprobado') return (
    <Button disabled width="100%">
        Disponible para usuarios aprobados
    </Button>
  )

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
