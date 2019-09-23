import React, { useState } from 'react';

import { Form } from 'antd';

import useSweet from '../../../hooks/useSweetAlert';
import TextField from '../../reusables/TextField';
import TextAreaField from '../../reusables/TextAreaField';
import ImagePicker from '../../reusables/ImagePicker';
import Button from '../../reusables/Button';
import Spinner from '../../reusables/Spinner';

import { uploadFile } from '../../../tools/firebaseTools';

function AdminSpeakerForm({
  addSpeaker, speakers, eventId
}) {
  const { errorAlert } = useSweet();
  const [localLoading, setLocalLoading] = useState(false);
  const initialState = {
    title: null,
    fullName: null,
    photoURL: null,
    city: null,
    bio: null,
  }
  const [state, setState] = useState(initialState);

  const [photoURL, setPhotoURL] = useState(null);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({ ...state, [name]: value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setLocalLoading(true);
    const st = { ...state };

    uploadFile('speakers', st.photoURL)
      .then((url) => {
        st.photoURL = url;
        addSpeaker(eventId, st);
        setLocalLoading(false);
      })
      .catch(() => {
        errorAlert({});
        setLocalLoading(false);
      });
  }

  console.log(speakers);

  return (
    <Form onSubmit={handleSubmit}>
      { localLoading && <Spinner /> }
      <TextField
        onChange={handleChange}
        value={state.title}
        name="title"
        label="Grado del ponente"
      />
      <TextField
        onChange={handleChange}
        value={state.fullName}
        name="fullName"
        label="Nombre completo"
      />
      <ImagePicker
        onBase64={url64 => setPhotoURL(url64)}
        onChange={file => handleChange({ target: { name: 'photoURL', value: file } })}
        label="Foto"
        url={photoURL}
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
      <Button width="100%" htmlType="submit">
        Agregar ponente
      </Button>
    </Form>
  );
}

export default AdminSpeakerForm;
