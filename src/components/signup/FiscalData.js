import React from 'react';
import { Typography } from 'antd';

import FullScreenContainer from '../../atoms/layout/FullScreenContainer';
import Container from '../../atoms/layout/Container';
import Gastro from '../../atoms/gastro/Gastro';
import { palette, size } from '../../styles/theme';
import FiscalDataForm from '../../organisms/forms/FiscalDataForm';
import Steper from '../../organisms/Steper';

const FiscalData = () => {
  return (
    <div className="signup-container">
      <div className="signup-container-left">
        <Gastro />
        <Steper />
      </div>

      <div className="signup-container-rigth">
        <FiscalDataForm />
      </div>
    </div>
  );
};

export default FiscalData;
