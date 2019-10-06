import React from 'react';
import Card from '../../membership/reusables/MerbershipCard';

function MembersCost() {
  return (
    <div className="home-members-costs">
      <Card
        membershipType="Nevo ingreso"
        membershipCostDisplay="$4,750.00"
        onlyHeader
      />
      <Card
        membershipType="Socio"
        membershipCostDisplay="$3,250.00"
        onlyHeader
      />
      <Card
        membershipType="Titulares"
        membershipCostDisplay="$1,625.00"
        onlyHeader
      />
      <Card
        membershipType="Eméritos"
        onlyHeader
      />
    </div>
  );
}

export default MembersCost;
