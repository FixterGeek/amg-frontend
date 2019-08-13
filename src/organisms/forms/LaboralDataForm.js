import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import TextField from '../../molecules/TextFields';
import SelectField from '../../molecules/SelectField';
import AmgButton from '../../atoms/Button';
import { Radio, Input } from 'antd';

//import { createUser } from "../../store/actions";
import Label from '../../atoms/data-entry/Label';

import states from './estados.json';

const LaboralDataForm = ({ history }) => {
  const { Group } = Radio;

  const [work, setWork] = useState(0);
  const [office, setOffice] = useState(0);
  const [institutions, setInstitutions] = useState({
    alien: {
      name: null,
      president: null,
      type: null,
      location: {
        street: null,
        colony: null,
        zipCode: null,
        city: null,
        state: null,
      },
    },
    own: {
      name: null,
      president: null,
      type: 'Consultorio',
      location: {
        street: null,
        colony: null,
        zipCode: null,
        city: null,
        state: null,
      },
    },
  });

  const { alien, own } = institutions;

  const handleSubmit = () => {
    history.push('fiscal');
  };

  const handleWork = ({ target }) => {
    setWork(target.value);
  };

  const handleOffice = ({ target }) => {
    setOffice(target.value);
  };

  const handleAlien = ({ target }) => {
    const { name, value } = target;

    if (name === 'city' || name === 'colony' || name === 'street' || name === 'zipCode') {
      setInstitutions({
        ...institutions,
        alien: {
          ...alien,
          location: {
            ...alien.location,
            [name]: value,
          },
        },
      });
    } else {
      setInstitutions({
        ...institutions,
        alien: {
          ...alien,
          [name]: value,
        },
      });
    }
  };

  const handleOwn = ({ target }) => {
    const { name, value } = target;

    if (name === 'city' || name === 'colony' || name === 'street' || name === 'zipCode') {
      setInstitutions({
        ...institutions,
        own: {
          ...own,
          location: {
            ...own.location,
            [name]: value,
          },
        },
      });
    } else {
      setInstitutions({
        ...institutions,
        own: {
          ...own,
          [name]: value,
        },
      });
    }
  };

  console.log(institutions);

  return (
    <form
      className="signup-form"
      style={{ width: '400px' }}
      onSubmit={handleSubmit}
    >
      <Group onChange={handleWork} value={work}>
        <Label>¿Actualmente labora en un hospital o institución?</Label>
        <Radio value={1}> Si </Radio>
        <Radio value={0}> No </Radio>
      </Group>

      {
        work === 1 && (
          <div>
            <TextField
              onChange={handleAlien}
              value={alien.name}
              name="name"
              label="Nombre institución" />
            <TextField
              onChange={handleAlien}
              value={alien.president}
              name="president"
              label="Presidente" />
            <SelectField
              name="type"
              label="Tipo de institución"
              options={['Hospital', 'Escuela', 'Consultorio', 'Sociedad']}
            />
            <TextField
              onChange={handleAlien}
              value={alien.location.street}
              name="street"
              label="Direccipon" />
            <TextField
              onChange={handleAlien}
              value={alien.location.colony}
              name="colony"
              label="colony" />
            <TextField
              onChange={handleAlien}
              value={alien.location.zipCode}
              name="zipCode"
              label="Código postal" />
            <TextField
              onChange={handleAlien}
              value={alien.location.city}
              name="city"
              label="Ciudad" />
            <SelectField name="state" label="Estado" options={states} />
          </div>
        )
      }

      <Group name="office" onChange={handleOffice} value={office}>
        <Label>¿Posee un consultorio?</Label>
        <Radio value={1}> Si </Radio>
        <Radio value={0}> No </Radio>
      </Group>

      {
        office === 1 && (
          <div>
            <TextField
              onChange={handleOwn}
              value={own.name}
              name="name"
              label="Nombre institución" />
            <TextField
              onChange={handleOwn}
              value={own.president}
              name="president"
              label="Presidente" />
            <TextField
              onChange={handleOwn}
              value={own.location.street}
              name="street"
              label="Direccipon" />
            <TextField
              onChange={handleOwn}
              value={own.location.colony}
              name="colony"
              label="colony" />
            <TextField
              onChange={handleOwn}
              value={own.location.zipCode}
              name="zipCode"
              label="Código postal" />
            <TextField
              onChange={handleOwn}
              value={own.location.city}
              name="city"
              label="Ciudad" />
            <SelectField name="state" label="Estado" options={states} />
          </div>
        )
      }

      <AmgButton width="100%" htmlType="submit">
        Siguiente
      </AmgButton>
    </form>
  );
};

export default withRouter(LaboralDataForm);
