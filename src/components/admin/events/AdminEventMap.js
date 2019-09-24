import React, { useState } from 'react';

import { Form } from 'antd';

import MapLocation from '../../events/reusables/MapLocation';
import ContainerItem from '../../reusables/ContainerItem';
import TextField from '../../reusables/TextField';
import Button from '../../reusables/Button';

import { normalizeDate, transformToFormData } from './tools';

function AdminEventMap({
  state, saveDraftEvent,
}) {
  const initialCoordinates = {
    latitude: null,
    longitude: null,
  }
  const [coordinates, setCoordinates] = useState(initialCoordinates);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const st = { ...state };
    st.location = { ...state.location, coordinates: [coordinates.latitude, coordinates.longitude] };
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
        <Button width="100%" htmlType="submit">
          Agregar ubicación
        </Button>
      </Form>
      <ContainerItem>
        <MapLocation zoom={9} marckeable onCoordinates={handleCoordinates} />
      </ContainerItem>
    </div>
  );
}

export default AdminEventMap;
