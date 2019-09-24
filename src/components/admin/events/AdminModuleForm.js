import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Form } from 'antd';

import {
  addModuleAction,
  updateEventModuleAction,
} from '../../../store/ducks/adminDuck';
import TextField from '../../reusables/TextField';
import TextAreaField from '../../reusables/TextAreaField';
import Button from '../../reusables/Button';

function AdminModuleForm({
  eventId, addModuleAction, updateEventModuleAction,
  externalData,
}) {
  const initialState = {
    event: null,
    title: null,
    description: null,
    date: null,
    _id: null,
  }

  const [state, setState] = useState(initialState);

  useEffect(() => {
    if (externalData && !state._id) setState({ ...externalData })
  }, [externalData])

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({ ...state, [name]: value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const st = { ...state }
    st.event = eventId;
    
    if (state._id) updateEventModuleAction(st._id, st);
    else {
      delete st._id;
      addModuleAction(st);
    }
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

function mapSatateToProps({ admin }) {
  return {
    fetching: admin.workingOn.fetching,
    status: admin.workingOn.status,
  };
}

export default connect(
  mapSatateToProps, {
    addModuleAction,
    updateEventModuleAction,
  }
)(AdminModuleForm);