import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { Typography, Radio } from 'antd';

import DashboardContainerItem from '../../atoms/DashboardContainerItem';
import Button from '../../atoms/Button';

function PaymentType({ history }) {
  const [state, setState] = useState('card');
  const { Title } = Typography;
  const { Group } = Radio;
  const { location } = history;
  const membership = location.pathname.split('/')[3];

  return (
    <DashboardContainerItem>
      <div>
        <Title level={3}>Método de pago</Title>
      </div>
      <form>
        <Group
          onChange={({ target }) => setState(target.value)}
          size="large"
          className="payment-type-group"
          value={state}>
          <Radio value="card">Tarjeta debito / credito</Radio>
          <Radio value="oxxo">Pago en oxxo</Radio>
        </Group>
      </form>
      <Link to={`/dashboard/payment/${membership}/${state}`}>
        <Button width="100%">Siguiente</Button>
      </Link>
    </DashboardContainerItem>
  );
}

export default withRouter(PaymentType);
