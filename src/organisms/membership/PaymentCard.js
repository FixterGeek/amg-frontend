/* eslint-disable no-lonely-if */
import React, { useState, useEffect } from 'react';

import { Typography } from 'antd';

import DashboardContainerItem from '../../atoms/DashboardContainerItem';
import TextField from '../../molecules/TextFields';
import MonthPicker from '../../molecules/MonthPicker';
import Button from '../../atoms/Button';

function PaymentCard() {
  const { Title } = Typography;

  const initialMessages = {
    name: '',
    number: '',
    expiration: '',
    ccv: '',
  }
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    number: '',
    expiration: '',
    ccv: '',
  });
  const [warnings, setWarning] = useState({ ...initialMessages });
  const [success, setSuccess] = useState({ ...initialMessages });
  const [card, setCard] = useState({ ...initialMessages });
  const [loading, setLoading] = useState(false);


  const { Conekta } = window;

  function validateCardData(name, value) {
    console.log(value);
    let valid = true;
    let e = { ...initialMessages };
    let w = { ...initialMessages };
    let s = { ...initialMessages };

    switch (name) {
      case 'number':
        if (value.length < 15) {
          valid = false;
          w = { ...e, number: 'El numero de la tarjeta debe ser mayor a 14 digitos' };
          // con el regex formateamos el numero para agregar - or " "
        }
        if (value.length > 14) {
          if (!Conekta.card.validateNumber(value)) {
            valid = false;
            e = { ...e, number: 'El número de tarjeta no es valido' };
          } else {
            s = { ...s, number: `Tarjeta ${Conekta.card.getBrand(value)}` };
          }
        }
        break;
      case 'name':
        if (value.length < 5) {
          valid = false;
          w = { ...w, name: 'Tu nombre completo' };
        }
        break;
      case 'expiration':
        if (value.length < 4) {
          valid = false;
          w = { ...w, expiration: 'El formato de fecha debe ser mm/yy' };
        } else {
          // eslint-disable-next-line no-lonely-if
          if (!Conekta.card.validateExpirationDate(`${value}`.slice(0, 2), `${value}`.slice(2, 4))) {
            valid = false;
            e = { ...e, expiration: 'La fecha no es valida' };
          }
        }
        break;
      case 'ccv':
        if (value.length < 3) {
          valid = false;
          w = { ...w, ccv: 'el código de seguridad debe ser de 3 ó 4 digitos' };
        } else {
          if (!Conekta.card.validateCVC(value)) {
            valid = false;
            e = { ...e, ccv: 'Código de seguridad no valido' };
          }
        }
        break;
      default:
        break;
    }

    console.log(e, w);

    setErrors({ errors, ...e });
    setWarning({ warnings, ...w });
    setSuccess({ success, ...s });
    setIsValid(valid);
    // 2.- Si hay un campo mal (1) isValid = false y agregar el error
    // 3.- return isValid
  }

  const handleCard = (event) => {
    const { target } = event;
    const { value, name } = target;
    let val = value;

    if (name === 'expiration' && String(value).length > 4) val = value.slice(0, 3);
    if (name === 'ccv' && String(value).length > 3) val = value.slice(0, 2);
    setCard({ ...card, [name]: val });
    validateCardData(name, val);
  };

  function handleSubmit() {
    //validate
  }

  return (
    <DashboardContainerItem className="payment-card">
      <div>
        <Title level={3}>Tarjeta debito/crédito</Title>
      </div>
      <DashboardContainerItem>
        <form onSubmit={handleSubmit} className="payment-card-form">
          <div>
            <TextField
              onChange={handleCard}
              value={card.number}
              name="number"
              label="Número de tarjeta"
              error={errors.number}
              errorMessage={errors.number}
              warning={warnings.number}
              warningMessage={warnings.number}
              success={success.number}
              successMessage={success.number}
            />
          </div>
          <div>
            <TextField
              onChange={handleCard}
              value={card.name}
              name="name"
              label="Nombre del titular de la tarjeta"
              error={errors.name}
              errorMessage={errors.name}

            />
          </div>
          <div className="payment-card-container">
            <TextField
              error={errors.expiration}
              errorMessage={errors.expiration}
              onChange={handleCard}
              label="Fecha de expiración"
              value={card.expiration}
              name="expiration" />
            <TextField
              value={card.ccv}
              onChange={handleCard}
              label="Código de seguridad"
              name="ccv"
              width="100px"
              error={errors.ccv}
              errorMessage={errors.ccv}
              warning={warnings.ccv}
              warningMessage={warnings.ccv}
            />
          </div>
          <Button disabled={!isValid || loading} width="100%">Pagar</Button>
        </form>
      </DashboardContainerItem>
    </DashboardContainerItem>
  );
}

export default PaymentCard;
