import React from 'react';
import axios from 'axios';

import { Form } from 'antd';

import MapLocation from '../../events/reusables/MapLocation';
import ContainerItem from '../../reusables/ContainerItem';
import TextField from '../../reusables/TextField';

function AdminEventMap() {
  const handleCoordinates = (coordinatesArray) => {
    console.log(coordinatesArray);
  }

  return (
    <div>
      <Form>
        <TextField
          label="Latitud"
        />
      </Form>
      <ContainerItem>
        <MapLocation zoom={9} marckeable onCoordinates={handleCoordinates} />
      </ContainerItem>
    </div>
  );
}

export default AdminEventMap;
