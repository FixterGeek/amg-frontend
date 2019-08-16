import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Typography } from 'antd';

import { writeNewFiscalData } from '../../store/ducks/signupDuck';
import { updateUserAction } from '../../store/ducks/userDuck';
import TextField from '../../molecules/TextFields';
import SelectField from '../../molecules/SelectField';
import Button from '../../atoms/Button';
import ContainerItem from '../../atoms/DashboardContainerItem';
import Spinner from '../../atoms/Spinner';
import states from './estados.json';

const FiscalDataForm = ({
  history, signup, fiscalData, writeNewFiscalData,
  updateUserAction, userFetching, user
}) => {
  const { Title } = Typography;

  const handleChange = ({ target }) => {
    const { name, value } = target;
    if (name === 'rfc') writeNewFiscalData({ [name]: value });
    else writeNewFiscalData({ address: { ...fiscalData.address, [name]: value } });
  };

  const handleSave = (event) => {
    event.preventDefault();
    localStorage.user = JSON.stringify(signup);
    updateUserAction({ ...user, fiscalData: { ...signup.fiscalData } })
      .then((data) => {
        console.log(data);
        history.push('/dashboard/')
      })
  };

  return (
    <form className="signup-form  relative" onSubmit={handleSave}>
      { userFetching && <Spinner tip="Completamdo registro..." /> }
      <ContainerItem>
        <Title>Datos Fiscales</Title>
      </ContainerItem>
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

      <Button width="100%" htmlType="submit" disabled={!(
        !fiscalData.rfc || fiscalData.address.street || !fiscalData.address.colony ||
        !fiscalData.address.zipCode || !fiscalData.address.city || !fiscalData.address.state
      )}>
        Siguiente
      </Button>
    </form>
  );
};

function mapStateToProps({ signup, user }) {
  return {
    user,
    userFetching: user.fetching,
    fiscalData: signup.fiscalData,
    signup,
  };
}

export default withRouter(
  connect(mapStateToProps, { writeNewFiscalData, updateUserAction })(FiscalDataForm),
);
