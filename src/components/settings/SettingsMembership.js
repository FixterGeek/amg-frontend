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
          'Consulta completa de revista ',
          'Inscripción a eventos sin costo',
          'Acceso a transmisiones de sesiones en vivo',
          'Descarga constancias de participacón',
        ]}
      />

      <MembershipCard
        membershipType="Residente"
        membershipCostDisplay="$625"
        membershipCost={625}
        points={[
          'Consulta completa de revista',
          'Acceso total a calendario de eventos',
          'Inscripción a eventos con costo adicional',
          'Acceso a guías y consensos',
        ]} />
    </div>
  );

  return <div>Disculpa las molestias, aun estamos validando tu cuenta.</div>
}

export default SettingsMembership;
