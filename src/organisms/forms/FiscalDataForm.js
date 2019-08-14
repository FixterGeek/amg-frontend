import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Typography } from 'antd';

import { writeNewFiscalData } from '../../store/ducks/signupDuck';
import TextField from '../../molecules/TextFields';
import SelectField from '../../molecules/SelectField';
import Button from '../../atoms/Button';
import ContainerItem from '../../atoms/DashboardContainerItem';
import states from './estados.json';

const FiscalDataForm = ({ history, signup, fiscalData, writeNewFiscalData }) => {
  const { Title } = Typography;

  const handleChange = ({ target }) => {
    const { name, value } = target;
    if (name === 'rfc') writeNewFiscalData({ [name]: value });
    else writeNewFiscalData({ address: { ...fiscalData.address, [name]: value } });
  };

  const handleSave = () => {
    localStorage.user = JSON.stringify(signup);
  };

  return (
    <form className="signup-form  relative">
      <ContainerItem>
        <Title>Datos Fiscales</Title>
      </ContainerItem>
      <Button onClick={handleSave} className="reusable-save-button" line>
        Guardar
      </Button>
      <ContainerItem>
        <TextField
          onChange={handleChange}
          value={fiscalData.rfc}
          name="rfc"
          label="RFC" />
        <TextField
          onChange={handleChange}
          value={fiscalData.address.street}
          name="street"
          label="Dirección" />
        <TextField
          onChange={handleChange}
          value={fiscalData.address.colony}
          name="colony"
          label="Colonia" />
        <TextField
          onChange={handleChange}
          value={fiscalData.address.zipCode}
          name="zipCode"
          label="Código postal" />
        <TextField
          onChange={handleChange}
          value={fiscalData.address.city}
          name="city"
          label="Ciudad" />
        <SelectField
          onChange={value => handleChange({ target: { value, name: 'state' } })}
          value={fiscalData.address.state}
          name="address.state"
          label="Estado"
          options={states} />
      </ContainerItem>

      <Button width="100%" htmlType="submit">
        Siguiente
      </Button>
    </form>
  );
};

function mapStateToProps({ signup }) {
  return {
    fiscalData: signup.fiscalData,
    signup,
  };
}

export default withRouter(
  connect(mapStateToProps, { writeNewFiscalData })(FiscalDataForm),
);
