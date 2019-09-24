import React, { useState } from 'react';

import { Form } from 'antd';

import TextField from '../../reusables/TextField';
import TextAreaField from '../../reusables/TextAreaField';
import Button from '../../reusables/Button';

function AdminModuleForm({ eventId, addModule }) {
  const initialState = {
    event: null,
    title: null,
    description: null,
    date: null,
  }

  const [state, setState] = useState(initialState);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({ ...state, [name]: value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const st = { ...state }
    st.event = eventId;
    
    addModule(st);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <TextField
        onChange={handleChange}
        value={state.title}
        name="title"
        label="Titulo"
      />
      <TextAreaField
        onChange={handleChange}
        value={state.description}
        name="description"
        label="Descripción"
      />
      <Button width="100%" htmlType="submit">
        Agregar
      </Button>
    </Form>
  );
}

export default AdminModuleForm;