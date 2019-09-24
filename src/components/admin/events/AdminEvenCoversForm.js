import React, { useState } from 'react';

import { Form } from 'antd';

import ImagePicker from '../../reusables/ImagePicker';
import Button from '../../reusables/Button';

import { uploadFile } from '../../../tools/firebaseTools';
import { normalizeDate, transformToFormData } from './tools';

function AdminEventCoversForm({
  eventId, state, saveDraftEvent
}) {
  const [covers, setCover] = useState({
    thumbnailImages: null,
    mainImages: null,
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setCover({ ...covers, [name]: value })
  }

  const handleSave = (event) => {
    event.preventDefault();
    const st = { ...state }
    st.thumbnailImages = covers.thumbnailImages;
    st.mainImages = covers.mainImages;

    const normalizedData = normalizeDate(st);
    const form = new FormData();

    const formData = transformToFormData(form, normalizedData.normalizedData);
    saveDraftEvent({ body: formData, id: normalizeDate.id });
  }

  return (
    <Form className="admin-events-event-covers" onSubmit={handleSave}>
      <div className="admin-events-event-covers-small">
        <ImagePicker
          onChange={file => handleChange({ target: { name: 'thumbnailImages', value: file } })}
          label="Imagen pequeña"
          url={state.thumbnailImagesURLS[0] || null}
        />
      </div>
      <div className="admin-events-event-covers-large">
        <ImagePicker
          onChange={file => handleChange({ target: { name: 'mainImages', value: file } })}
          label="Imagen grande"
          url={state.mainImagesURLS[0] || null}
        />
      </div>
      <Button width="100%" htmlType="submit"> 
        Agregar portadas
      </Button>
    </Form>
  );
}

export default AdminEventCoversForm;
