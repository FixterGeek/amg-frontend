import React from 'react';

import Card from '../../membership/reusables/MerbershipCard';

function MembershipsCards() {
  return (
    <div className="home-reusables-membership-cards">
      <Card
        membershipType="No socio"
        hiddenCurrency
        points={[
          'Acceso a los eventos',
          'Inscripción a eventos con pago',
          'Acceso a la revista',
          'Acceso a las guías y consensos'
        ]}
        toLink="/pre-signup"
      />
      <Card
        membershipType="Socio"
        membershipCostDisplay="$4750"
        membershipCost={4750}
        points={[
          '•Acceso total a los beneficios de la plataforma GASTRO',
          '•Inscripción a todos los eventos sin costo incluyendo ECOS y SENAGA',
          '• Pago de membresía online'
        ]}
        toLink="/pre-signup"
      />
      <Card
        membershipType="Socio en entrenamiento"
        membershipCostDisplay="$625"
        membershipCost={625}
        points={[
          'Inscripción a eventos con costo adicional',
          'Inscripción a todos los eventos sin costo incluyendo ECOS y SENAGA',
          'Pago de membresía online'
        ]}
        toLink="/pre-signup"
      />
    </div>
  );
}

export default MembershipsCards;
