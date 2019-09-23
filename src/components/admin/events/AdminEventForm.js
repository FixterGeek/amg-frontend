import React from 'react';
import { connect } from 'react-redux';

import { Form, Switch } from 'antd';

import { updateWorkingOn } from '../../../store/ducks/adminDuck';
import TextField from '../../reusables/TextField';
import RangeDatePicker from '../../reusables/RangeDatePicker';
import TextAreaField from '../../reusables/TextAreaField';
import TimePickerField from '../../reusables/TimePickerField';
import SelectField, { OptionSelect } from '../../reusables/SelectField';

import estados from '../estados.json'

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
    <Form className="admin-events-event-form">
      <Switch
        className="admin-events-event-form-active-switch"
        checkedChildren="Activo"
        unCheckedChildren="Inactivo"
      />
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
      <TimePickerField
        onChange={m => handleChange({ target: { name: 'startTime', value: m.toString() } })}
        value={state.startTime}
        label="Hora de inicio"
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
      <TextField
        onChange={event => handleChange(event, 'location')}
        value={state.location.street}
        label="Direcciòn"
        name="street"
        placeholder="Calle"
      />
      <TextField
        onChange={event => handleChange(event, 'location')}
        value={state.location.zipCode}
        label="Código postal"
        name="zipCode"
        placeholder="07239"
      />
      <TextField
        onChange={event => handleChange(event, 'location')}
        value={state.location.city}
        label="Ciudad"
        name="city"
        placeholder="Ciudad de México"
      />
      <SelectField
        onChange={state => handleChange({ target: { name: 'state', value: state } }, 'location')}
        value={state.location.state}
        placeholder="Selecciona un estado"
        label="Estado">
        {
          Object.keys(estados).map(key => (
            <OptionSelect key={key} value={estados[key]}>
              { estados[key] }
            </OptionSelect>
          ))
        }
      </SelectField>
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
