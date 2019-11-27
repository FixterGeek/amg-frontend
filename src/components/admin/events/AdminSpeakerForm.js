import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Form, Icon } from 'antd';

import { addSPeaker, saveDraftEvent } from '../../../store/ducks/adminDuck';
import useSweet from '../../../hooks/useSweetAlert';
import TextField from '../../reusables/TextField';
import TextAreaField from '../../reusables/TextAreaField';
import SelectField, { OptionSelect } from '../../reusables/SelectField';
import ImagePicker from '../../reusables/ImagePicker';
import Button from '../../reusables/Button';
import Spinner from '../../reusables/Spinner';
import FormManager from '../reusables/CreateAndUpdateManager';

import { uploadFile } from '../../../tools/firebaseTools'

function AdminSpeakerForm({
  addSpeaker, speakers, eventId,
  isModal, existingData = {},
  event: ev, saveDraftEvent, status,
  drafStatus,
}) {
  const initialState = {
    _id: existingData._id || null,
    title: existingData.title || 'Médico',
    fullName: existingData.fullName || null,
    photoURL: existingData.photoURL || null,
    city: existingData.city || null,
    bio: existingData.bio || null,
    photoFile: null,
  }
  const { errorAlert } = useSweet();
  const [localLoading, setLocalLoading] = useState(false);
  const [state, setState] = useState(initialState);

  const [photoURL, setPhotoURL] = useState(null);

  // console.log(existingData);
  useEffect(() => {
    if (existingData && !state._id) setState(existingData);
  }, []);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({ ...state, [name]: value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setLocalLoading(true);
    const st = { ...state };

    if (st.photoFile) uploadFile('speakers', st.photoFile)
      .then((url) => {
        st.photoURL = url;
        addSpeaker(eventId, st);
        setLocalLoading(false);
      })
      .catch((error) => {
        errorAlert({});
        setLocalLoading(false);
      });
    else {
      if (st._id) {
        console.log(ev._id);
        const eventData = normalizeData({ ...ev, speakers: ev.speakers.map(s => s._id === st._id ? st : s), id: ev._id });
        const form = new FormData();
        const formData = transformToFormData(form, eventData.normalizedData);
        saveDraftEvent({ body: formData, id: ev._id });
        setLocalLoading(false);
      }
      else {
        delete st._id
        addSpeaker(eventId, st);
        setLocalLoading(false);
      }
    }
  }

  const normalizeData = (eventData) => {
    // console.log(eventData);
    // const normalizedData = { ...eventData }
    delete eventData.modules;
    delete eventData.assistants;
    delete eventData.courses;
    const id = eventData._id;
    delete eventData._id;
    return { normalizedData: eventData, id };
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

  console.log(drafStatus, status);

  return (
    <FormManager
      isModal={isModal}
      modalOpenText={existingData && existingData._id ? 'Actualizar ponente' : 'Agregar ponente'}
      onModalClose={() => setState(initialState)}
      status={
        drafStatus === 'success' || status === 'success' ? 'success' :
        drafStatus === 'error' || status === 'error' ? 'error' : null
      }
      openModalElement={
        existingData && existingData._id ?
        <div style={{ color: '#28abd8' }}>Editar <Icon type="edit" /></div>
        : null
      }
      successClose
      errorClose
      lineButton
      noSubmit
    >
      <Form onSubmit={handleSubmit}>
        { localLoading && <Spinner /> }
        <SelectField
          onChange={value => handleChange({ target: { name: 'title', value } })}
          value={state.title}
          label="Grado del ponente">
          <OptionSelect value="Doctor">
            Doctor
          </OptionSelect>
          <OptionSelect value="Lic. en enfermería">
            Lic. en enfermería
          </OptionSelect>
          <OptionSelect value="Lic. en nutrición">
            Lic. en nutrición
          </OptionSelect>
        </SelectField>
        <TextField
          onChange={handleChange}
          value={state.fullName}
          name="fullName"
          label="Nombre completo"
        />
        <ImagePicker
          onBase64={url64 => setPhotoURL(url64)}
          onChange={file => handleChange({ target: { name: 'photoFile', value: file } })}
          label="Foto"
          url={state.photoURL || photoURL}
        />
        <TextField
          onChange={handleChange}
          value={state.city}
          name="city"
          label="Ciudad"
        />
        <TextAreaField
          onChange={handleChange}
          value={state.bio}
          name="bio"
          label="Mini biografía del ponente"
        />
        <Button width="100%" htmlType="submit"> Agregar ponente </Button>
      </Form>
    </FormManager>
  );
}

function mapStateToProps({ admin }) {
  // console.log(admin);
  return {
    admin,
    status: admin.workingOn.s || admin.workingOn.status,
    drafStatus: admin.draftEvents.status,
  }
}

export default connect(
  mapStateToProps, {
    addSPeaker,
    saveDraftEvent,
  }
)(AdminSpeakerForm);
