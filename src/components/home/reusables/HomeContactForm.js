import React, { useState } from 'react';
import axios from 'axios';

import { message } from 'antd';

import useSweet from '../../../hooks/useSweetAlert';
import TextField from '../../reusables/TextField';
import SelectField, { OptionSelect } from '../../reusables/SelectField';
import Button from '../../reusables/Button';

function HomeContactForm() {
  const {  infoAlert} = useSweet();
  const [disabledSendButton, setDisabledSendButton] = useState(true);
  const [contactData, setContactData] = useState({
    email: null,
    name: null,
    topic: null,
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setContactData({ ...contactData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const textArea = form.querySelectorAll('div')[0].querySelectorAll('div')[0].querySelectorAll('textarea')[0];
    const APIURL = `${process.env.REACT_APP_BASE_API_URL}/contact`;

    if (!textArea.value) return infoAlert({ text: 'Verifica la casilla' });
    axios.post(`${APIURL}/recapcha`, {
      response: textArea.value,
    }).then(({ data }) => {
      if (data.success) {
        message.success('Ahora puedes contactarnos.');
        setDisabledSendButton(false);
      }
    })
    .catch((error) => message.error('Intenta de nuevo.'));
  };

  const handleSend = (event) => {
    const APIURL = `${process.env.REACT_APP_BASE_API_URL}/contact`;

    axios.post(APIURL, contactData)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };

  return (
    <div className="home-reusables-contact-form">
      <TextField
        onChange={handleChange}
        name="email"
        label="¿Cuál es tu correo?"
        value={contactData.email}
      />
      <TextField
        onChange={handleChange}
        name="name"
        label="¿Cuál es tu nombre?"
        value={contactData.name}
      />
      <SelectField
        label="¿De qué se trata?"
        onChange={value => handleChange({ target: { name: 'topic', value } })}
        value={contactData.topic}>
        <OptionSelect value="Académico">Académico</OptionSelect>
        <OptionSelect value="Pagos">Pagos</OptionSelect>
        <OptionSelect value="Revista">Revista</OptionSelect>
        <OptionSelect value="Técnico">Técnico</OptionSelect>
      </SelectField>
      <form action="?" method="POST" onSubmit={handleSubmit}>
        <div class="g-recaptcha" data-sitekey="6LfXl7sUAAAAANAztRRuFtdE19H_FSlduja29Qg-" />
          <br/>
        <input type="submit" value="Verificar" style={{ display: 'none'}} />
      </form>
      {
        disabledSendButton && (
          <Button width="100%" disabled={disabledSendButton} onClick={handleSend}>
            Enviar
          </Button>
        )
      }
    </div>
  );
}

export default HomeContactForm;
