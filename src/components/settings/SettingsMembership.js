import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { Typography, Descriptions } from 'antd';

import useSweet from '../../hooks/useSweetAlert';
import { getSelfUser } from '../../services/userServices';
import MembershipCard from '../membership/reusables/MerbershipCard';
import Spinner from '../reusables/Spinner';

function SettingsMembership({
  membershipStatus, userStatus, selectables = [],
  userIsInFilial = false, filial = {},
}) {
  const { Title } = Typography;

  const [discount, setDiscount] = useState(4750);
  const [loading, setLoading] = useState(true);
  const { errorAlert } = useSweet();

  const { bankData = {
    bank: '',
    CLABE: '',
    accountNumber: '',
  }} = filial;

  useEffect(() => {
    getSelfUser()
    .then(selfUser => {
      const { socioStatus } = selfUser;
      console.log(selfUser);
      const assigned = Object.keys(socioStatus).filter(key => socioStatus[key].assigned).pop();
      if (assigned) {
        setDiscount(socioStatus[assigned].cost);
      }
      setLoading(false);
    })
    .catch(error => {
      console.log(error);
      errorAlert({ text: 'Ocúrrio un problema con las membresias' })
      setLoading(false);
    });
  }, []);

  if (userStatus === 'Aprobado') return (
    <div className="settings-membership">
      {
        loading && <Spinner fullScrren />
      }
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
        !selectables[0] && !userIsInFilial ? <Title level={4}>La información estará disponible cuando sean aprobadodos tus datos.</Title> : null
      }
      {
        selectables.includes('Socio') && !userIsInFilial ? (
          <MembershipCard
            membershipType="Socio"
            membershipCostDisplay={`$${discount}`}
            membershipCost={discount}
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
