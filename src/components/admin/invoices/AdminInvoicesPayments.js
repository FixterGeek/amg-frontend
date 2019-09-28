import React from 'react';

import { Typography } from 'antd';

import ContainerItem from '../../reusables/ContainerItem';
import PaymentsList from './reusables/PaymentsList';

function AdminInvoicesPayments() {
  const { Title } = Typography;

  return (
    <section>
      <ContainerItem>
        <Title>Pagos</Title>
      </ContainerItem>
      <PaymentsList />
    </section>
  );
}

export default AdminInvoicesPayments;
