import React from 'react';
import { connect } from 'react-redux';

import { Form } from 'antd';

import { updateWorkingOn } from '../../../store/ducks/adminDuck';
import TextField from '../../reusables/TextField';
import RangeDatePicker from '../../reusables/RangeDatePicker';
import TextAreaField from '../../reusables/TextAreaField';

function AdminEventForm({
  state, setState
}) {
  const handleChange = ({ target }, sub) => {
    const { name, value } = target;

    if (name === 'dates') {
      setState({ startDate: value[0].toString(), endDate: value[1].toString() });
      return;
    }
    if (name === 'addressed') {
      const desc = [...state.description];
      desc[0] = value;
      setState({ description: desc })
    }
    if (name === 'value') {
      const desc = [...state.description];
      desc[1] = value;
      setState({ description: desc })
    }
    if (name === 'objective') {
      const desc = [...state.description];
      desc[2] = value;
      setState({ description: desc })
    }
    if (sub) {
      const object = state[sub]
      object[name] = value
      setState({ [sub]: object })
      return
    }
    setState({ [name]: value })
  };

  console.log(state);

  return (
    <Form>
      <TextField
        onChange={handleChange}
        value={state.title}
        name="title"
        label="Nombre del evento"
      />
      <RangeDatePicker
        onChange={m => handleChange({ target: { name: 'dates', value: m } })}
        label="Fechas"
        format="MM/DD/YYYY"
        dateOne={state.startDate}
        dateTwo={state.endDate}
      />
      <TextAreaField
        onChange={handleChange}
        value={state.description[0]}
        label="Dirigido a"
        name="addressed"
      />
      <TextAreaField
        onChange={handleChange}
        value={state.description[1]}
        label="Valor curricular"
        name="value"
      />
      <TextAreaField
        onChange={handleChange}
        value={state.description[2]}
        label="Objetivo"
        name="objective"
      />
    </Form>
  );
}

function mapStateToProps({ admin }) {
  return {
    state: admin.workingOn,
  }
}

export default connect(
  mapStateToProps, {
    setState: updateWorkingOn,
  }
)(AdminEventForm);
