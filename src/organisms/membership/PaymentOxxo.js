import React from 'react';

import { Typography } from 'antd';

import DashboardContainerItem from '../../atoms/DashboardContainerItem';
import Button from '../../atoms/Button';

function PaymentOxxo() {
  const { Title, Text } = Typography;

  return (
    <DashboardContainerItem>
      <div>
        <Title level={3}>Pago en oxxo</Title>
      </div>
      <div>
        logo de oxxo
      </div>
      <div>
        <Title level={3}>Instrucciones</Title>
      </div>
      <div>
        <div>
          <Text strong>1. </Text>
          <Text>Da clic en boton Generar referencia</Text>
        </div>
        <div>
          <Text strong>2. </Text>
          <Text>Usa la referencia para pagar en cajas.</Text>
        </div>
        <div>
          <Text strong>3. </Text>
          <Text>Recibirás un e-mail cuando el pago haya sido aprobado</Text>
        </div>
        <Button width="100%">Generar referencia</Button>
      </div>
    </DashboardContainerItem>
  );
}

export default PaymentOxxo;
