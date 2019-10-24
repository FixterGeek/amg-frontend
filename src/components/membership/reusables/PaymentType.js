import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Typography, Form, Radio } from 'antd';

import ContainerItem from '../../reusables/ContainerItem';
import Button from '../../reusables/Button';

function PaymentType({ title, onChange }) {
  const { Title } = Typography;

  const [type, setType] = useState('card');

  const handleChange = ({ target }) => {
    setType(target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onChange) onChange(type);
  };

  return (
    <div className="dashboard-container">
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
    </div>
  );
}

export default PaymentType;

PaymentType.propTypes = {
  title: PropTypes.string,
};

PaymentType.defaultProps = {
  title: 'Tipo de pago',
};
