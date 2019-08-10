import React, { useState, useEffect } from 'react';

import { Typography } from 'antd';

import DashboardContainerItem from '../../atoms/DashboardContainerItem';
import TextField from '../../molecules/TextFields';
import MonthPicker from '../../molecules/MonthPicker';
import Button from '../../atoms/Button';
let errorInitial = {
  name: null,
  number: null,
  expiration: null,
  ccv: null
}
function PaymentCard() {
  const { Title } = Typography;

  let [isValid, setIsValid] = useState(false)
  let [errors, setErrors] = useState({ ...errorInitial })
  const [card, setCard] = useState({
    name: '',
    number: '',
    expiration: '',
    ccv: ''
  });
  let [loading, setLoading] = useState(false)


  useEffect(() => {
    validateCardData()
    console.log("validating")
  }, [card])

  //const { Conekta } = window;
  //Conekta.setPublicKey(process.env.REACT_APP_CONEKTA_PUBLIC_KEY);

  function validateCardData() {
    // 0.- Optimistic way isValid = true
    let valid = true
    let e = {}
    // 1.- hay que validar todos los campos de tarjeta no solo 1
    console.log(String(card.number).length < 15)
    if (String(card.number).length < 15) {
      setIsValid(false)
      e = { ...e, number: "El numero de la tarjeta debe ser mayor a 14 digitos" }
      // con el regex formateamos el numero para agregar - or " "
    }
    if (card.name.length < 5) {
      setIsValid(false)
      e = { ...e, name: "Tu nombre completo" }
    }
    if (card.expiration.length < 4) {
      setIsValid(false)
      e = { ...e, expiration: "El formato de fecha debe ser mm/yy" }
    }
    setErrors({ ...e })
    setIsValid(valid)
    // 2.- Si hay un campo mal (1) isValid = false y agregar el error
    // 3.- return isValid
  }

  const handleCard = (event) => {
    const { target } = event;
    let { value, name } = target;
    if (name === "expiration" && String(value).length > 4) value = value.slice(0, 3)
    if (name === "ccv" && String(value).length > 3) value = value.slice(0, 2)
    setCard({ ...card, [name]: value })
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
              error={errors.ccv}
              errorMessage={errors.ccv}
              value={card.ccv}
              onChange={handleCard}
              label="Código de seguridad"
              name="ccv" width="100px" />
          </div>
          <Button disabled={!isValid || loading} width="100%">Pagar</Button>
        </form>
      </DashboardContainerItem>
    </DashboardContainerItem>
  );
}

export default PaymentCard;
