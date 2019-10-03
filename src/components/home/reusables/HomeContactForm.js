import React, { useState } from 'react';

import { Form } from 'antd';
import TextField from '../../reusables/TextField';
import SelectField, { OptionSelect } from '../../reusables/SelectField';
import Button from '../../reusables/Button';

function HomeContactForm() {
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
    console.log(event.target);
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
      <SelectField label="¿De qué se trata?">
        <OptionSelect value="Académico">Académico</OptionSelect>
        <OptionSelect value="Pagos">Pagos</OptionSelect>
        <OptionSelect value="Revista">Revista</OptionSelect>
        <OptionSelect value="Técnico">Técnico</OptionSelect>
      </SelectField>
      <form action="?" method="POST" onSubmit={handleSubmit}>
        <div class="g-recaptcha" data-sitekey="6LfXl7sUAAAAANAztRRuFtdE19H_FSlduja29Qg-" />
          <br/>
        <input type="submit" value="Verificar" />
      </form>
      <Button width="100%">
        Enviar
      </Button>
    </div>
  );
}

export default HomeContactForm;
