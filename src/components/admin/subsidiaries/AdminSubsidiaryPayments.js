import React from 'react';

import { Typography } from 'antd';

import ContainerItem from '../../reusables/ContainerItem';
import PaymentsList from './reusables/PaymentsList';

export function AdminSubsidiaryPayments() {
  const { Title } = Typography;

  return (
    <section>
      <ContainerItem className="dash-item-center">
        <Title>Historial de pagos</Title>
        <ContainerItem>
          <PaymentsList />
        </ContainerItem>
      </ContainerItem>
    </section>
  );
}

export default AdminSubsidiaryPayments;
