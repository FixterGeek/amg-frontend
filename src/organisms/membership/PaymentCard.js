import React, { useState } from 'react';

import { Typography } from 'antd';

import DashboardContainerItem from '../../atoms/DashboardContainerItem';
import TextField from '../../molecules/TextFields';
import MonthPicker from '../../molecules/MonthPicker';
import Button from '../../atoms/Button';

function PaymentCard() {
  const { Title } = Typography;
  const [card, setCard] = useState({
    numberCard: {
      value: null,
      error: null,
      errorMessage: '',
    },
  });

  const { Conekta } = window;
  Conekta.setPublicKey(process.env.REACT_APP_CONEKTA_PUBLIC_KEY);

  console.log(Conekta.getLanguage());

  const handleCard = (event) => {
    const { target } = event;
    const { value } = target;

    if (Conekta.card.validateNumber(value)) {
      //
    } else {
      setCard({ ...card, numberCard: { value, error: true, errorMessage: 'Tarjeta no valida' } });
    }
    setCard({ ...card, numberCard: value });
  };

  return (
    <DashboardContainerItem className="payment-card">
      <div>
        <Title level={3}>Tarjeta debito/crédito</Title>
      </div>
      <DashboardContainerItem>
        <form className="payment-card-form">
          <div>
            <TextField
              onChange={handleCard}
              value={card.numberCard}
              name="card"
              label="Número de tarjeta" />
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
