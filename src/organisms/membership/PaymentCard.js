import React from 'react';

import { Typography } from 'antd';

import DashboardContainerItem from '../../atoms/DashboardContainerItem';
import TextField from '../../molecules/TextFields';
import MonthPicker from '../../molecules/MonthPicker';
import Button from '../../atoms/Button';

function PaymentCard() {
  const { Title } = Typography;

  return (
    <DashboardContainerItem className="payment-card">
      <div>
        <Title level={3}>Tarjeta debito/crédito</Title>
      </div>
      <DashboardContainerItem>
        <form className="payment-card-form">
          <div>
            <TextField label="Número de tarjeta" />
          </div>
          <div>
            <TextField label="Nombre del titular" />
          </div>
          <div className="payment-card-container">
            <MonthPicker label="Fecha de expiración" format="MM/YYYY" />
            <TextField label="ccv" width="100px" />
          </div>
          <Button width="100%">Pagar</Button>
        </form>
      </DashboardContainerItem>
    </DashboardContainerItem>
  );
}

export default PaymentCard;
