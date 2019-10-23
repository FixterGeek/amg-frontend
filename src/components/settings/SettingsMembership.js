import React from 'react';

import MembershipCard from '../membership/reusables/MerbershipCard';

function SettingsMembership({ membershipStatus, userStatus }) {
  console.log(membershipStatus, userStatus)
  if (userStatus === 'Aprobado') return (
    <div className="settings-membership">
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
      {
        membershipStatus !== 'Socio' ? null : (
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
        )
      }
    </div>
  );

  return <div>Disculpa las molestias, aun estamos validando tu cuenta.</div>
}

export default SettingsMembership;
