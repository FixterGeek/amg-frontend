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

  const payableText = userPays ? 'Pagar por este evento' : 'Inscribirme'

  console.log(userPays)

  if (payable && userPays) return (
    <Link
      to={{
        pathname: `/dashboard/payment/event/${eventObject._id}`,
        state: eventObject,
      }}
    >
      Pagar
    </Link>
  )

  if (payable && !userPays) return (
    <Button>
      { payableText }
    </Button>
  );
}

export default SubscribeButton;
