import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Form } from 'antd';

import useSweet from '../../../hooks/useSweetAlert';
import { addActivityAction, updateEventActivityAction } from '../../../store/ducks/adminDuck';
import TextField from '../../reusables/TextField';
import SelectField, { OptionSelect } from '../../reusables/SelectField';
import TextAreaField from '../../reusables/TextAreaField';
import DatePickerField from '../../reusables/DatePickerField';
import TimePickerField from '../../reusables/TimePickerField';
import DocumentField from '../../reusables/DocumentField';
import Button from '../../reusables/Button';
import Spinner from '../../reusables/Spinner';

import { uploadFile } from '../../../tools/firebaseTools';

function AdminActivityForm({
  module, eventId, addActivityAction,
  fetching, status, updateEventActivityAction,
  externalData
}) {
  const { errorAlert } = useSweet();
  const initialState = {
    event: eventId,
    module: module._id,
    moduleTitle: module.title,
    activityName: null,
    activityType: null, // 'Actividad', 'Conferencia', 'Taller', 'Otro'
    description: null,
    date: null,
    startTime: null,
    endTime: null,
    address: null,
    constanciaURL: null,
    speakers: [],
    _id: null,
  };
  const [state, setState] = useState(initialState);
  const [localLoading, setLocalLoading] = useState(false);

  useEffect(() => {
    if (externalData && !state._id) {
      setState({ ...state, ...externalData })
    }
  }, [externalData])

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({ ...state, [name]: value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const st = { ...state };
    st.module = module._id;
    setLocalLoading(true)
    if (state._id) {
      setLocalLoading(false);
      updateEventActivityAction(st._id, st);
    } else {
      delete st._id;
      uploadFile(`/events/${eventId}/mocules`, st.constanciaURL)
      .then((url) => {
        st.constanciaURL = url;
        addActivityAction(st);
        setLocalLoading(false);
      })
      .catch(() => {
        setLocalLoading(false);
        errorAlert({});
      })
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      { localLoading && <Spinner /> }
      <TextField
        value={state.moduleTitle}
        disabled
        label="Módulo"
      />
      <SelectField
        onChange={value => handleChange({ target: { name: 'activityType', value } })}
        value={state.activityType}
        label="Tipo de actividad"
      >
        {
          ['Actividad', 'Conferencia', 'Taller', 'Otro'].map((type, index) => (
            <OptionSelect key={index} value={type}>
              { type }
            </OptionSelect>
          ))
        }
      </SelectField>
      <TextField
        onChange={handleChange}
        value={state.activityName}
        name="activityName"
        label="Nombre de la actividad"
      />
      <TextAreaField
        onChange={handleChange}
        value={state.description}
        name="description"
        label="Descripció de la actividad"
      />
      <DatePickerField
        onChange={m => handleChange({ target: { name: 'date', value: m.toString() } })}
        value={state.date}
        label="Fecha de la actividad"
      />
      <TimePickerField
        onChange={m => handleChange({ target: { name: 'startTime', value: m.toString() } })}
        value={state.startTime}
        label="Hora de inicio"
      />
      <TimePickerField
        onChange={m => handleChange({ target: { name: 'endTime', value: m.toString() } })}
        value={state.endTime}
        label="Hora de termino"
      />
      <TextField
        onChange={handleChange}
        value={state.address}
        name="address"
        label="Ubicación"
      />
      <DocumentField
        onFile={file => handleChange({ target: { name: 'constanciaURL', value: file } })}
        url={state.constanciaURL}
        label="Constancia"
      />
      <Button width="100%" htmlType="submit">
        { state._id ? 'Actualizar actividad' : 'Agregar actividad' }
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
    addActivityAction,
    updateEventActivityAction,
  }
)(AdminActivityForm);
