/* eslint-disable no-lonely-if */
import React, { useState, useEffect } from 'react';

import { Typography } from 'antd';

import useSweet from '../../../hooks/useSweetAlert';
import DashboardContainerItem from '../../reusables/ContainerItem';
import TextField from '../../reusables/TextField';
import SelectField, { OptionSelect } from '../../reusables/SelectField';
import Button from '../../reusables/Button';
import Spinner from '../../reusables/Spinner';
import moment from 'moment';

function PaymentCardForm({ onChange, onSubmit, amount, concept, paid, phone }) {
  const { Title } = Typography;
  const { errorAlert } = useSweet();

  const [years, setYears] = useState([]);

  const initialMessages = {
    name: '',
    number: '',
    expiration: {
      month: '',
      year: '',
    },
    ccv: '',
    phone: phone || null,
    exp: [null, null]
  }

  const months = [
    { label: '01 | Enero', value: 1 },
    { label: '02 | Febrero', value: 2 },
    { label: '03 | Marzo', value: 3 },
    { label: '04 | Abril', value: 4 },
    { label: '05 | Mayo', value: 5 },
    { label: '06 | Junio', value: 6 },
    { label: '07 | Julio', value: 7 },
    { label: '08 | Agosto', value: 8 },
    { label: '09 | Septiembre', value: 9 },
    { label: '10 | Octubre', value: 10 },
    { label: '11 | Noviembre', value: 11 },
    { label: '12 | Diciembre', value: 12 },
  ]

  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    number: '',
    expiration: {
      month: '',
      year: '',
    },
    ccv: '',
  });
  const [warnings, setWarning] = useState({ ...initialMessages });
  const [success, setSuccess] = useState({ ...initialMessages });
  const [card, setCard] = useState({ ...initialMessages });
  const [loading, setLoading] = useState(false);

  const allIsFill = card.name && card.number && card.expiration.month && card.expiration.year && card.ccv;

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
    const range = [];
    for (let index = Number(moment().format('YYYY')); index < (Number(moment().format('YYYY')) + 50); index++) {
      range.push(index);
    }
    setYears(range);
  }, [])


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

    if (name === 'ccv' && String(value).length > 3) val = value.slice(0, 2);
    if (name === 'month' || name === 'year') setCard({ ...card, expiration: { ...card.expiration, [name]: val }});
    else setCard({ ...card, [name]: val });
    validateCardData(name, val);
  };

  function handleSubmit(event) {
    event.preventDefault()
    const { Conekta } = window;
    const tokenParams = {
      card: {
        number: card.number,
        name: card.name,
        exp_year: card.expiration.year,
        exp_month: card.expiration.month,
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
              errorMessage={errors.number || warnings.number || success.number}
              validateStatus={
                errors.number ? 'error' : warnings.number ? 'warning' :
                  success.number ? 'success' : null
              }
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
            {/* <TextField
              error={errors.expiration}
              errorMessage={errors.expiration}
              onChange={handleCard}
              label="Fecha de expiración"
              value={card.expiration}
              name="expiration" /> */}
            <div className="exp-fields">
              <SelectField
                label="Mes exp"
                onChange={value => handleCard({ target: { name: 'month', value } })}
                value={card.expiration.month}
              >
                {
                  months.map(month => (
                    <OptionSelect key={month.label} value={month.value}>
                      { month.label }
                    </OptionSelect>
                  ))
                }
              </SelectField>

              <SelectField
                label="Año exp"
                onChange={value => handleCard({ target: { name: 'year', value } })}
                value={card.expiration.year}
              >
                {
                  years.map(y => (
                    <OptionSelect key={y} value={y}>
                      { y }
                    </OptionSelect>
                  ))
                }
              </SelectField>
            </div>
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
            disabled={!isValid || loading || paid || !allIsFill}
            width="100%" >
            Pagar
          </Button>
        </form>
      </DashboardContainerItem>
    </div>
  );
}

export default PaymentCardForm;
