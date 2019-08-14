import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Radio, Typography, Icon } from 'antd';

import { writeNewInstitution, writeNewOwnInstitution } from '../../store/ducks/signupDuck';
import TextField from '../../molecules/TextFields';
import SelectField from '../../molecules/SelectField';
import Label from '../../atoms/data-entry/Label';
import ContainerItem from '../../atoms/DashboardContainerItem';
import Button from '../../atoms/Button';

import states from './estados.json';

const LaboralDataForm = ({
  history, newInstitution, newOwnInstitution,
  writeNewInstitution, writeNewOwnInstitution,
  signup,
}) => {
  const { Group } = Radio;
  const { Title } = Typography;

  const [work, setWork] = useState(0);
  const [office, setOffice] = useState(0);


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

    if (name === 'name' || name === 'president' || name === 'type')
      writeNewInstitution({ [name]: value });
    else writeNewInstitution({
      ...newInstitution,
      location: { ...newInstitution.location, [name]: value },
    });
  };

  const handleOwn = ({ target }) => {
    const { name, value } = target;

    if (name === 'name' || name === 'president' || name === 'type')
      writeNewOwnInstitution({ [name]: value });
    else writeNewOwnInstitution({
      ...newOwnInstitution,
      location: { ...newOwnInstitution.location, [name]: value },
    });
  };

  const handleSave = () => {
    localStorage.user = JSON.stringify(signup);
  };


  return (
    <form className="signup-form  relative" onSubmit={handleSubmit}>
      <ContainerItem>
        <Title> Datos laborales </Title>
      </ContainerItem>

      <Button onClick={handleSave} className="reusable-save-button" line>
        Guardar
        <Icon type="save" />
      </Button>

      <ContainerItem>
        <Group onChange={handleWork} value={work}>
          <Label>¿Actualmente labora en un hospital o institución?</Label>
          <Radio value={1}> Si </Radio>
          <Radio value={0}> No </Radio>
        </Group>
      </ContainerItem>

      {
        work === 1 && (
          <div>
            <TextField
              onChange={handleAlien}
              value={newInstitution.name}
              name="name"
              label="Nombre institución" />
            <TextField
              onChange={handleAlien}
              value={newInstitution.president}
              name="president"
              label="Presidente" />
            <SelectField
              onChange={value => handleAlien({ target: { value, name: 'type' } })}
              value={newInstitution.type}
              name="type"
              label="Tipo de institución"
              options={['Hospital', 'Escuela', 'Consultorio', 'Sociedad']}
            />
            <TextField
              onChange={handleAlien}
              value={newInstitution.location.street}
              name="street"
              label="Dirección" />
            <TextField
              onChange={handleAlien}
              value={newInstitution.location.colony}
              name="colony"
              label="Colonia" />
            <TextField
              onChange={handleAlien}
              value={newInstitution.location.zipCode}
              name="zipCode"
              label="Código postal" />
            <TextField
              onChange={handleAlien}
              value={newInstitution.location.city}
              name="city"
              label="Ciudad" />
            <SelectField
              onChange={value => handleAlien({ target: { value, name: 'state' } })}
              value={newInstitution.location.state}
              name="state"
              label="Estado"
              options={states} />
          </div>
        )
      }

      <ContainerItem>
        <Group name="office" onChange={handleOffice} value={office}>
          <Label>¿Posee un consultorio?</Label>
          <Radio value={1}> Si </Radio>
          <Radio value={0}> No </Radio>
        </Group>
      </ContainerItem>

      {
        office === 1 && (
          <div>
            <TextField
              onChange={handleOwn}
              value={newOwnInstitution.name}
              name="name"
              label="Nombre institución" />
            <TextField
              onChange={handleOwn}
              value={newOwnInstitution.president}
              name="president"
              label="Presidente" />
            <TextField
              onChange={handleOwn}
              value={newOwnInstitution.location.street}
              name="street"
              label="Dirección" />
            <TextField
              onChange={handleOwn}
              value={newOwnInstitution.location.colony}
              name="colony"
              label="Colonia" />
            <TextField
              onChange={handleOwn}
              value={newOwnInstitution.location.zipCode}
              name="zipCode"
              label="Código postal" />
            <TextField
              onChange={handleOwn}
              value={newOwnInstitution.location.city}
              name="city"
              label="Ciudad" />
            <SelectField
              onChange={value => handleOwn({ target: { value, name: 'state' } })}
              value={newOwnInstitution.location.state}
              name="state"
              label="Estado"
              options={states} />
          </div>
        )
      }

      <Button width="100%" htmlType="submit">
        Siguiente
      </Button>
    </form>
  );
};

function mapSateToProp({ signup }) {
  return {
    newInstitution: signup.newInstitution,
    newOwnInstitution: signup.newOwnInstitution,
    signup,
  };
}

export default withRouter(
  connect(mapSateToProp, { writeNewInstitution, writeNewOwnInstitution })(LaboralDataForm),
);
