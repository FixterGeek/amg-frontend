import React from "react";
import { Typography } from "antd";

import FullScreenContainer from "../../atoms/layout/FullScreenContainer";
import Container from "../../atoms/layout/Container";
import Gastro from "../../atoms/gastro/Gastro";
import { palette, size } from "../../styles/theme";
import GeneralDataForm from "../../organisms/forms/GeneralDataFormD";
import Steper from "../../organisms/Steper";

const GeneralData = () => {
  const { Title } = Typography;
  return (
    <FullScreenContainer
      lateralSpace="0px"
      paddingTop="0px"
      paddingBottom="0px"
      bgColor={palette.secondary}
    >
      <Container
        alignItems="flex-start"
        className="signup-left"
        height="100vh"
        width="30%"
        bgColor={palette.secondary}
        paddingTop={size.largePadding}
        paddingBottom={size.largePadding}
      >
        <Gastro />
        <Steper alignItems="center" />
      </Container>

      <Container className="signup-rigth" height="100vh" width="65%">
        <Container
          alignItems="flex-start"
          flexGrow={5}
          height="auto"
          width="100%"
          paddingTop={size.largePadding}
          paddingBottom={size.largePadding}
        >
          <Title clasName="title-left" level={6}>
            Datos generales
          </Title>
        </Container>
        <GeneralDataForm />
      </Container>
    </FullScreenContainer>
  );
};

export default GeneralData;
