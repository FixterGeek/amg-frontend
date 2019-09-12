import React from 'react';

import PaymentCardForm from './reusables/PaymentCardForm';
import ContainerItem from '../reusables/ContainerItem';

function MembershipPaymentCard({ history, match }) {
  const { location = {} } = history;
  const { params } = match;
  const { state = {} } = location;


  return (
    <ContainerItem>
      ok
      <PaymentCardForm

      />
    </ContainerItem>
  );
}

export default MembershipPaymentCard;
