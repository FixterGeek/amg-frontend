import React, { useState } from 'react';
import { Typography } from 'antd';

import FullScreenContainer from '../../atoms/layout/FullScreenContainer';
import Container from '../../atoms/layout/Container';
import Gastro from '../../atoms/gastro/Gastro';
import { palette, size } from '../../styles/theme';
import GeneralDataForm from '../../organisms/forms/GeneralDataForm';
import Steper from '../../organisms/Steper';

const GeneralData = () => {
  const { Title } = Typography;
  return (
    <div className="signup-container">
      <Container
        alignItems="flex-start"
        className="signup-left"
        width="30%"
        bgColor={palette.secondary}
        paddingTop={size.largePadding}
        paddingBottom={size.largePadding}
      >
        <Gastro />
        <Steper alignItems="center" />
      </Container>

      <Container className="signup-rigth" width="65%">
        <Container
          alignItems="flex-start"
          flexGrow={5}
          height="auto"
          width="100%"
          paddingTop={size.largePadding}
          paddingBottom={size.largePadding}
        >
          <Title className="title-left" level={1}>
            Datos generales
          </Title>
        </Container>
        <GeneralDataForm />
      </Container>
    </div>
  );
};

export default GeneralData;
