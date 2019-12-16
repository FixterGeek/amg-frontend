import React, { useState } from 'react';

import { Form } from 'antd';

import MapLocation from '../../events/reusables/MapLocation';
import ContainerItem from '../../reusables/ContainerItem';
import TextField from '../../reusables/TextField';
import ImagePicker from '../../reusables/ImagePicker';
import Button from '../../reusables/Button';

import { normalizeDate, transformToFormData } from './tools';
import { uploadFile } from '../../../tools/firebaseTools';

function AdminEventMap({
  state, saveDraftEvent,
}) {
  const { location = { coordinates: [null, null] } } = state;
  const initialCoordinates = {
    latitude: location.coordinates[0],
    longitude: location.coordinates[1],
  }
  const [coordinates, setCoordinates] = useState(initialCoordinates);
  const [imageForMobiles, setMobilImage] = useState(null);

  const handleCoordinates = (coordinatesArray) => {
    setCoordinates({
      latitude: coordinatesArray[0],
      longitude: coordinatesArray[1],
    })
  }

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setCoordinates({ ...coordinates, [name]: value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    let mapImage = null;
    if (imageForMobiles) await uploadFile(`events/${state._id}/map-images/`, imageForMobiles)
      .then(url => mapImage = url);
    const st = { ...state };
    st.location = { ...state.location, mapImage, coordinates: [coordinates.latitude, coordinates.longitude] };
    const normalizedData = normalizeDate(st);
    const form = new FormData();

    const formData = transformToFormData(form, normalizedData.normalizedData)

    saveDraftEvent({ body: formData, id: normalizedData.id });
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <TextField
          onChange={handleChange}
          name="latitude"
          label="Latitud"
          value={coordinates.latitude}
        />
        <TextField
          onChange={handleChange}
          name="longitude"
          label="Longitud"
          value={coordinates.longitude}
        />
        <ImagePicker
          label="Imagen de mapa solo para mobiles"
          onChange={file => setMobilImage(file)}
        />
        <Button width="100%" htmlType="submit">
          Agregar ubicación
        </Button>
      </Form>
      <ContainerItem>
        <MapLocation zoom={13} marckeable onCoordinates={handleCoordinates} coordinates={coordinates} />
      </ContainerItem>
    </div>
  );
}

export default AdminEventMap;
