import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../../reusables/Button';

function SubscribeButton({
  payable, user = {}, eventObject,
  eventSubscribe
}) {
  const { membershipStatus = 'Veterano', useStatus } = user;
  // const userPays = membershipStatus === 'Socio' || membershipStatus === 'Veterano' ?
  //   false : membershipStatus === 'Free' || membershipStatus === 'Residente'

  const userPays = true;

  console.log(userPays)

  if (payable && userPays) return (
    <Link
      className="events-reusables-subscribe-link"
      to={{
        pathname: `/dashboard/payment/event/${eventObject._id}`,
        state: eventObject,
      }}
    >
      Pagar por este evento
    </Link>
  )

  if (payable && !userPays) return (
    <Button>
      Inscribirme
    </Button>
  );
}

export default SubscribeButton;
