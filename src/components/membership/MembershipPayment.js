import React, { useEffect } from 'react';

import { Typography } from 'antd';

import useSweet from '../../hooks/useSweetAlert';
import PaymentType from '../../organisms/membership/PaymentType';
import PaymentCard from '../../organisms/membership/PaymentCard';
import PaymentOxxo from '../../organisms/membership/PaymentOxxo';

function MembershipPayment({ history }) {
  const { Title } = Typography;
  const { location } = history;
  const type = location.pathname.split('/')[4];

  const { infoAlert } = useSweet();

  useEffect(() => {
    infoAlert({ text: 'Por el momento este servicio esta deshabilitado.' });
    history.push('/dashboard/settings');
  }, []);

  return (
    <div className="dashboard-container">
      <div>
        <Title>Membresia</Title>
      </div>
      {
        !type && <PaymentType />
      }
      {
        type === 'card' && <PaymentCard />
      }
      {
        type === 'oxxo' && <PaymentOxxo />
      }
    </div>
  );
}

export default MembershipPayment;
