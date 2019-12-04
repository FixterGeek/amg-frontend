/* eslint-disable no-lonely-if */
import React, { useState, useEffect } from 'react';

import { Typography } from 'antd';

import useSweet from '../../../hooks/useSweetAlert';
import DashboardContainerItem from '../../reusables/ContainerItem';
import TextField from '../../../molecules/TextFields';
import Button from '../../reusables/Button';
import Spinner from '../../reusables/Spinner';

function PaymentCardForm({ onChange, onSubmit, amount, concept, paid, phone }) {
  const { Title } = Typography;
  const { errorAlert } = useSweet();

  const initialMessages = {
    name: '',
    number: '',
    expiration: '',
    ccv: '',
    phone: phone || null,
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

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.conekta.io/js/latest/conekta.js';
    document.body.appendChild(script);

    script.onload = () => {
      const { Conekta } = window;
      Conekta.setPublicKey('key_FGFhHyz9UV5786QGdKmTcEw')
    }
  }, []);


  useEffect(() => {
    if (onChange) onChange(card);
  }, [card])

  function validateCardData(name, value) {
    let valid = [true];
    let e = { ...errors };
    let w = { ...warnings };
    let s = { ...success };
    const { Conekta } = window;

    switch (name) {
      case 'number':
        e = { ...e, number: null };
        w = { ...w, number: null };
        if (value.length < 15) {
          valid.push(false);
          w = { ...w, number: 'El numero de la tarjeta debe ser mayor a 14 digitos' };
          // con el regex formateamos el numero para agregar - or " "
        }
        if (value.length > 14) {
          if (!Conekta.card.validateNumber(value)) {
            valid.push(false);
            e = { ...e, number: 'El número de tarjeta no es valido' };
          } else {
            s = { ...s, number: `Tarjeta ${Conekta.card.getBrand(value)}` };
          }
        }
        break;
      case 'name':
        w = { ...w, name: null };
        if (value.length < 5) {
          valid.push(false);
          w = { ...w, name: 'Tu nombre completo' };
        }
        break;
      case 'expiration':
        e = { ...e, expiration: null };
        w = { ...w, expiration: null };
        if (value.length < 4) {
          valid.push(false);
          w = { ...w, expiration: 'El formato de fecha debe ser mm/yy' };
        } else {
          // eslint-disable-next-line no-lonely-if
          if (!Conekta.card.validateExpirationDate(`${value}`.slice(0, 2), `${value}`.slice(3, 5))) {
            valid.push(false);
            e = { ...e, expiration: 'La fecha no es valida' };
          }
        }
        break;
      case 'ccv':
        e = { ...e, ccv: null };
        w = { ...w, ccv: null };
        if (value.length < 3) {
          valid.push(false);
          w = { ...w, ccv: 'el código de seguridad debe ser de 3 ó 4 digitos' };
        } else {
          if (!Conekta.card.validateCVC(value)) {
            valid.push(false);
            e = { ...e, ccv: 'Código de seguridad no valido' };
          }
        }
        e = { ...e, ccv: null }
        break;
      default:
        break;
    }

    setErrors({ ...e });
    setWarning({ ...w });
    setSuccess({ ...s });
    setIsValid(!valid.includes(false));
    return valid;
    // 2.- Si hay un campo mal (1) isValid = false y agregar el error
    // 3.- return isValid
  }

  const handleCard = (event) => {
    const { target } = event;
    const { value, name } = target;
    let val = value;

    if (name === 'expiration' && String(value).length === 2) {
      if (Number(`${value}`.slice(0,2))) val = `${value}/`;
    }
    if (name === 'expiration' && String(value).length > 5) val = value.slice(0, 4);
    if (name === 'ccv' && String(value).length > 3) val = value.slice(0, 2);
    setCard({ ...card, [name]: val });
    validateCardData(name, val);
  };

  function handleSubmit(event) {
    event.preventDefault()
    const { Conekta } = window;
    const tokenParams = {
      card: {
        number: card.number,
        name: card.name,
        exp_year: card.expiration.slice(3, 5),
        exp_month: card.expiration.slice(0, 2),
        cvc: card.ccv,
      }
    };

    setLoading(true);

    const handleSucces = (token) => {
      setLoading(false);
      if (onSubmit) onSubmit({
        concept,
        amount,
        card,
        isValid,
        conektaToken: token,
        phone: card.phone,
      });
    }

    const handleError = (error) => {
      setLoading(false);
      errorAlert({
        title: error.message_to_purchaser,
        text: 'Verificá tus datos e intenta de nuevo',
      });
    }

    Conekta.Token.create(tokenParams, handleSucces, handleError);
  }

  return (
    <div>
      <div>
        <Title level={3}>Tarjeta debito/crédito</Title>
      </div>
      <DashboardContainerItem>
        <form onSubmit={handleSubmit} className="payment-card-form" style={{ position: 'relative' }}>
          { loading && <Spinner fullScrren /> }
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
          <TextField
            value={card.phone}
            onChange={handleCard}
            label="Número telefonico"
            width="100%"
            name="phone"
          />
          <TextField
            value={amount}
            label="Monto a pagar (MXN)"
            disabled
          />
          <TextField
            value={concept}
            label="Concepto"
            disabled
          />
          <Button
            htmlType="submit"
            disabled={!isValid || loading || paid}
            width="100%" >
            Pagar
          </Button>
        </form>
      </DashboardContainerItem>
    </div>
  );
}

export default PaymentCardForm;
