import React from 'react';

import Gastro from '../../atoms/gastro/Gastro';
import LaboralDataForm from '../../organisms/forms/LaboralDataForm';
import Steper from '../../organisms/Steper';

const LaboralData = () => {
  return (
    <div className="signup-container">
      <div className="signup-container-left">
        <Gastro />
        <Steper />
      </div>

      <div className="signup-container-rigth">
        <LaboralDataForm />
      </div>
    </div>
  );
};

export default LaboralData;
