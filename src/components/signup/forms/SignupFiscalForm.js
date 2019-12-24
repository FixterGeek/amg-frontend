import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Form, Typography } from 'antd';

import useSweet from '../../../hooks/useSweetAlert';
import ContainerItem from '../../reusables/ContainerItem';
import TextField from '../../reusables/TextField';
import SelectField, { OptionSelect } from '../../reusables/SelectField';
import Button from '../../reusables/Button';
import TermsAndConditions from '../TermsAndConditionsModal';
import Spinner from '../../reusables/Spinner';
import estados from '../../admin/estados.json';

function SignupFiscalForm({
  user, dispatch, loading,
  status, resetStatus, history,
  noTerms, noRedirect, firstTime,
}) {
  const { Title } = Typography;

  const { errorAlert } = useSweet();
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [fiscalData, setFiscalData] = useState({
    rfc: null,
    street: null,
    colony: null,
    zipCode: null,
    city: null,
    state: null,
  });

  useEffect(() => {
    if (user._id) setFiscalData({ rfc: user.fiscalData.rfc, ...user.fiscalData.address });
  }, [user]);

  useEffect(() => {
    if (status === 'error') {
      errorAlert({});
    }

    if (status === 'success') {
      if (!noRedirect) history.push('/dashboard');
    }
  }, [status]);

  useEffect(() => {
    if (acceptedTerms) {
      const upUser = user;
      upUser.fiscalData.rfc = fiscalData.rfc;
      upUser.fiscalData.address = { ...fiscalData }
      if (firstTime) upUser.userStatus = 'Pendiente';
      dispatch({ ...upUser });
    }
  }, [acceptedTerms]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFiscalData({ ...fiscalData, [name]: value });
  };


  return (
    <Form style={{ position: 'relative' }}>
      { loading && <Spinner fullScrren /> }
      <ContainerItem>
        <Title>Datos fiscales</Title>
      </ContainerItem>

      <TextField
        onChange={handleChange}
        value={fiscalData.rfc}
        name="rfc"
        label="RFC"
      />
      <TextField
        onChange={handleChange}
        value={fiscalData.street}
        name="street"
        label="Dirección"
      />
      <TextField
        onChange={handleChange}
        value={fiscalData.colony}
        name="colony"
        label="Colonia"
      />
      <TextField
        onChange={handleChange}
        value={fiscalData.zipCode}
        name="zipCode"
        label="Código postal"
      />
      <TextField
        onChange={handleChange}
        value={fiscalData.city}
        name="city"
        label="Ciudad"
      />
      <SelectField
        onChange={value => handleChange({ target: { name: 'state', value } })}
        value={fiscalData.state}
        label="Estado"
      >
        {
          Object.keys(estados).map(key => {
            return (
              <OptionSelect key={key} value={estados[key]}>
                { estados[key] }
              </OptionSelect>
            );
          })
        }
      </SelectField>
        {
          noTerms ? (
            <Button width="100%" onClick={() => setAcceptedTerms(true)}>
              Guardar
            </Button>
          ) : (
            <Button width="445px">
              <TermsAndConditions
                onAccept={value => setAcceptedTerms(value)}>
                Siguiente
              </TermsAndConditions>
            </Button>
          )
        }
    </Form>
  )
}

export default SignupFiscalForm;
