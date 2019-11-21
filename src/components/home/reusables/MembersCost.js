import React from 'react';
import Card from '../../membership/reusables/MerbershipCard';

function MembersCost() {
  return (
    <div className="home-members-costs">
      <div className="cards">
        <Card
          membershipType="Nuevo ingreso"
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
      <div className="notes">
        <p>
          Nota: Los precios mostrados son sujetos a cambios.  
        </p>
        <p>
          Nota: Las solicitudes de afiliación deberán ser aprobadas por el Consejo de Admisiones de la Asociación Mexicana de Gastroenterología, A.C.  
        </p>
      </div>
    </div>
  );
}

export default MembersCost;
