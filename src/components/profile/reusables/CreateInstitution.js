import React, { useState } from 'react';

import { Modal, Checkbox } from 'antd';

import { createInstitution, createIntitutionForUser } from '../../../services/institutionsServices';
import Button from '../../../atoms/Button';
import TextField from '../../../molecules/TextFields';
import SelectField from '../../../molecules/SelectField';
import states from '../../../organisms/forms/estados.json';
import Label from '../../../atoms/data-entry/Label';

function CreateInstitution({ user, onResult }) {
  const [open, setOpen] = useState(false);
  const [institution, setInstitution] = useState({
    name: null,
    type: null,
    president: null,
    owner: null,
    location: {
      street: null,
      colony: null,
      zipCode: null,
      city: null,
      state: null,
    },
  });


  const handleChange = ({ target }) => {
    const { name, value } = target;

    if (name === 'owner' || name === 'name' || name === 'president' || name === 'type') {
      setInstitution({ ...institution, [name]: value });
    } else {
      setInstitution({ ...institution, location: { ...institution.location, [name]: value } });
    }
  };


  const handleSave = (event) => {
    event.preventDefault();
    setOpen(false);
    createInstitution(institution)
      .then(data => onResult(null, data))
      .catch(({ response }) => onResult(response.data, null));
  };

  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        className="reusable-modal-create-intitution"
        bgColor="primary"
        line
      >
        Crear nueva institución
      </Button>
      <Modal
        onCancel={() => setOpen(false)}
        onOk={handleSave}
        visible={open}
      >
        <div>
          <Label>Institución propia</Label>
          <Checkbox onChange={() => handleChange({ target: { name: 'owner', value: user._id } })} />
        </div>
        <SelectField
          onChange={value => handleChange({ target: { value, name: 'type' } })}
          options={['Hospital', 'Escuela', 'Consultorio', 'Sociedad']}
          value={institution.type}
          label="Tipo de institución" />
        <TextField
          onChange={handleChange}
          value={institution.name}
          label="Nombre institución"
          name="name" />
        <TextField
          onChange={handleChange}
          value={institution.president}
          label="Presidente"
          name="president" />
        <TextField
          onChange={handleChange}
          value={institution.location.street}
          name="street"
          label="Dirección" />
        <TextField
          onChange={handleChange}
          value={institution.location.colony}
          name="colony"
          label="Colonia" />
        <TextField
          onChange={handleChange}
          value={institution.location.zipCode}
          name="zipCode"
          label="Código postal" />
        <TextField
          onChange={handleChange}
          value={institution.location.city}
          name="city"
          label="Ciudad" />
        <SelectField
          onChange={value => handleChange({ target: { value, name: 'state' } })}
          value={institution.location.state}
          name="state"
          label="Estado"
          options={states} />
      </Modal>
    </div>
  );
}

export default CreateInstitution;
