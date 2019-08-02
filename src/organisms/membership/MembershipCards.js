/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useState } from 'react';

import DashboardContainerItem from '../../atoms/DashboardContainerItem';
import MembershipCard from '../../molecules/membership/MembershipCard';

function MembershipCards({ user }) {
  const [checked, setChecked] = useState('Free');

  const handleMouseOut = () => {
    if (checked !== user.membershipStatus) setChecked(user.membershipStatus);
  };

  return (
    <DashboardContainerItem className="membership-cards-container">
      <MembershipCard
        onMouseOver={() => {
          if (checked !== 'Free') setChecked('Free');
        }}
        onMouseOut={handleMouseOut}
        checked={checked === 'Free'}
        name="Free"
        price="Gratis"
        points={[
          'Vista previa de revista',
          'Vista previa de eventos',
          'Registro a eventos con pagos de cuotas online',
        ]} />
      <MembershipCard
        onMouseOver={() => {
          if (checked !== 'Socio') setChecked('Socio');
        }}
        onMouseOut={handleMouseOut}
        checked={checked === 'Socio'}
        name="Socio"
        price="$4750"
        period="anual"
        points={[
          'Consulta completa de revista ',
          'Inscripción a eventos sin costo',
          'Acceso a transmisiones de sesiones en vivo',
          'Descarga constancias de participacón',
        ]} />
      <MembershipCard
        onMouseOver={() => {
          if (checked !== 'Residente') setChecked('Residente');
        }}
        onMouseOut={handleMouseOut}
        checked={checked === 'Residente'}
        name="Residente"
        price="$625"
        period="anual"
        points={[
          'Consulta completa de revista',
          'Acceso total a calendario de eventos',
          'Inscripción a eventos con costo adicional',
          'Acceso a guías y consensos',
        ]} />
    </DashboardContainerItem>
  );
}

export default MembershipCards;
