import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toFormData from 'object-to-formdata';

import { Typography, Form, Radio, Modal } from 'antd';

import { updateUserAction } from '../../../store/ducks/userDuck';
import ContainerItem from '../../reusables/ContainerItem';
import Button from '../../reusables/Button';
import TextField from '../../reusables/TextField';
import Spinner from '../../reusables/Spinner';

function PaymentType({
  title, onChange, loading, phone,
  updateUserAction, user,
}) {
  const { Title } = Typography;

  const [type, setType] = useState('card');
  const [userData, setUserData] = useState({
    ...user,
  })

  const handleChange = ({ target }) => {
    setType(target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onChange) onChange(type);
  };

  const handleChangePhone = ({ target }) => {
    setUserData(u => ({
      ...u,
      basicData: {
        ...u.basicData,
        phone: target.value,
      }
    }));
  }

  const handleUpdatePhone = () => {
    const formData = toFormData(userData, { nulls: true });
    updateUserAction(formData);
  }

  return (
    <div className="dashboard-container">
      { loading || user.fetching ? <Spinner fullScrren /> : null }
      <ContainerItem className="dash-item-center">
        <Title>{ title }</Title>
        <ContainerItem>
          <Title level={3}>Método de pago</Title>
          <Form onSubmit={handleSubmit}>
            <Form.Item>
              <Radio.Group onChange={handleChange} value={type}>
                <Radio value="card">Tarjeta debito / credito</Radio>
                <Radio value="oxxo">Pago en OXXO</Radio>
              </Radio.Group>
            </Form.Item>
            <Button width="100%" htmlType="submit">
              Siguiente
            </Button>
          </Form>
        </ContainerItem>
      </ContainerItem>
      <Modal
        visible={!phone}
        footer={null}
      >
        <Title level={3}>Importante, agrega tu número telefónico para continuar.</Title>
        <TextField
          onChange={handleChangePhone}
          value={userData.basicData.phone}
          label="Número telefónico"
        />
        <Button width="100%" htmlType="button" onClick={handleUpdatePhone}>
          Agregar número telefónico
        </Button>
      </Modal>
    </div>
  );
}

function mapSateToProps({ user }) {
  return { user };
}

export default connect(
  mapSateToProps, {
    updateUserAction,
  }
)(PaymentType);

PaymentType.propTypes = {
  title: PropTypes.string,
};

PaymentType.defaultProps = {
  title: 'Tipo de pago',
};
