import React from 'react';

import PaymentCardForm from './reusables/PaymentCardForm';
import ContainerItem from '../../atoms/DashboardContainerItem';

function PaymentActivity() {
  const handleChange = (data) => {
    console.log(data);
  }

  const handleSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="dashboard-container">
      <PaymentCardForm
        onChange={handleChange}
        onSubmit={handleSubmit}
        amount={1000}
      />
    </div>
  );
}

export default PaymentActivity;
