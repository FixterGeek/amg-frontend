import React from 'react';

import { Typography, Descriptions } from 'antd';

import MembershipCard from '../membership/reusables/MerbershipCard';

function SettingsMembership({
  membershipStatus, userStatus, selectables = [],
  userIsInFilial = false, filial = {},
}) {
  const { Title } = Typography;

  const { bankData = {
    bank: '',
    CLABE: '',
    accountNumber: '',
  }} = filial;

  if (userStatus === 'Aprobado') return (
    <div className="settings-membership">
      {
        userIsInFilial && (
          <Descriptions title="Datos bancarios de tu filial">
            <Descriptions.Item label="Banco">{ bankData.bank }</Descriptions.Item>
            <Descriptions.Item label="CLABE">{ bankData.CLABE }</Descriptions.Item>
            <Descriptions.Item label="Número de cuenta">{ bankData.accountNumber }</Descriptions.Item>
          </Descriptions>
        )
      }
      {
        !selectables[0] && !userIsInFilial ? <Title level={4}>Los información estará disponible cuando sean aprobadodos tus datos.</Title> : null
      }
      {
        selectables.includes('Socio') && !userIsInFilial ? (
          <MembershipCard
            membershipType="Socio"
            membershipCostDisplay="$4750"
            membershipCost={4750}
            points={[
              'Acceso total a los beneficios de la plataforma GASTRO',
              'Inscripción a todos los eventos sin costo incluyendo ECOS y SENAGA',
              'Pago de membresía online'
            ]}
            currentPlan={membershipStatus === 'Socio'}
            hiddenButton={membershipStatus === 'Socio'}
          />   
        ) : null
      }
      {
        selectables.includes('Residente') && !userIsInFilial ? (
          <MembershipCard
            membershipType="Socio en entrenamiento"
            membershipCostDisplay="$625"
            membershipCost={625}
            points={[
              'Inscripción a eventos con costo adicional',
              'Inscripción a todos los eventos sin costo incluyendo ECOS y SENAGA',
              'Pago de membresía online'
            ]}
            currentPlan={membershipStatus === 'Residente'}
            hiddenButton={membershipStatus === 'Residente'}
          />
        ) : null
      }
    </div>
  );

  return <div>Disculpa las molestias, aun estamos validando tu cuenta.</div>
}

export default SettingsMembership;
