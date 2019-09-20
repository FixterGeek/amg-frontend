import React, { useState } from 'react';

import { Form } from 'antd';
import TextField from '../../reusables/TextField';
import SelectField, { OptionSelect } from '../../reusables/SelectField';

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

  return (
    <Form>
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
    </Form>
  );
}

export default HomeContactForm;
