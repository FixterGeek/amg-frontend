import React, { useState } from 'react';
import toFormData from 'object-to-formdata';

import { Form, Switch } from 'antd';

import TextField from '../../reusables/TextField';
import RangeDatePicker from '../../reusables/RangeDatePicker';
import TextAreaField from '../../reusables/TextAreaField';
import TimePickerField from '../../reusables/TimePickerField';
import SelectField, { OptionSelect } from '../../reusables/SelectField';
import DocumentField from '../../reusables/DocumentField';
import Button from '../../reusables/Button';
import Spinner from '../../reusables/Spinner';
import { uploadFile } from '../../../tools/firebaseTools';

import estados from '../estados.json'

function AdminEventForm({
  state, setState, saveDraftEvent,
}) {
  const [uploadLoading, setUploadLoading] = useState(false);
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

  const handleStatus = (checked) => {
    const newStatus = checked ? 'published' : 'draft';
    setState({ status: newStatus })
    if (state._id) {
      const st = { ...state }
      st.status = newStatus;
      delete st.courses;
      const form = new FormData();
      const eventData = normalizeData(st);
      const formData = transformToFormData(form, eventData.normalizedData);
      saveDraftEvent({ body: formData, id: eventData.id });
    }
  }

  function transformToFormData(formData, obj, parentKey) {
    if (parentKey) {
        for (let k in obj) {
            formData.append(`${parentKey}[${k}]`, obj[k])
        }
    }
    else {
        for (let k in obj) {
            if (k === "permisos" || k === "mainImages") {
                formData.append(k, obj[k])
                continue
            }
            if (Array.isArray(obj[k]) || typeof obj[k] === "object") {
                formData.append(k, JSON.stringify(obj[k]))
                continue
            }
            // if (typeof obj[k] === "object") transformToFormData(formData, obj[k], k)
            else formData.append(k, obj[k])
        }
    }
    return formData
  }

  const handleSave = async event => {
    event.preventDefault();
    const st = { ...state };
    let constancia = null;
    delete st.courses;

    if (st.constancia) {
      setUploadLoading(true);
      constancia = await uploadFile(`/events/${st._id || st.title}`, st.constancia)
      .then(url => {
        setUploadLoading(false);
        st.constanciasURLS = [url];
        return url;
      })
    }
    const eventData = normalizeData(st);
    const form = new FormData();
    const formData = transformToFormData(form, eventData.normalizedData);
    saveDraftEvent({ body: formData, id: eventData.id });
  }

  const normalizeData = (eventData) => {
    const normalizedData = { ...eventData }
    delete normalizedData.modules;
    delete normalizedData.assistants;
    delete normalizeData.courses;
    const id = normalizedData._id;
    delete normalizedData._id;
    return { normalizedData, id };
  }

  console.log(state);

  return (
    <Form onSubmit={handleSave} className="admin-events-event-form">
      { uploadLoading && <Spinner fullScrren /> }
      <Switch
        onChange={handleStatus}
        className="admin-events-event-form-active-switch"
        checkedChildren="Activo"
        unCheckedChildren="Inactivo"
        checked={state.status === 'published'}
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
        values={[state.startDate, state.endDate]}
      />
      <TimePickerField
        onChange={m => handleChange({ target: { name: 'startTime', value: m.toString() } })}
        value={state.startTime}
        label="Hora de inicio"
      />
      <TextField
        onChange={({ target: { value } }) => handleChange({ target: { name: 'freeCost', value: Number(value) } }, 'cost' )}
        value={state.cost.freeCost}
        label="Costo para usuarios Free"
        name="freeCost"
      />
      <TextField
        onChange={event => handleChange(event, 'cost')}
        value={state.cost.residentCost}
        label="Costo para Socios en Entrenamiento"
        name="residentCost"
      />
      <TextField
        onChange={event => handleChange(event, 'cost')}
        value={state.cost.socioCost}
        label="Costo para Socios"
        name="socioCost"
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
      <DocumentField
        onFile={file => handleChange({ target: { name: 'permisos', value: file } })}
        file={state.permisos || null}
        label="Carta permiso"
        url={state.permisosURLS[0] || null}
      />
      <DocumentField
        onFile={file => handleChange({ target: { name: 'constancia', value: file } })}
        file={state.constancia || null}
        label="Constancia"
        url={state.constanciasURLS ? state.constanciasURLS[0] || null : null}
        fileTypes="forImages"
      />
      <Button width="100%" htmlType="submit">
        { state._id ? 'Actualizar evento' : 'Subir evento' }
      </Button>
    </Form>
  );
}

export default AdminEventForm;