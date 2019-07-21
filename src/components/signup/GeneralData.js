import React from "react";
import { Typography } from "antd";

import FullScreenContainer from "../../atoms/layout/FullScreenContainer";
import Container from "../../atoms/layout/Container";
import Gastro from "../../atoms/gastro/Gastro";
import { palette, size } from "../../styles/theme";
import GeneralDataForm from "../../organisms/forms/GeneralDataForm";
import Steper from "../../organisms/Steper";

const GeneralData = () => {
  const { Title } = Typography;
  return (
    <FullScreenContainer
      lateralSpace="0px"
      justifyContent="space-between"
      paddingTop="0px"
      paddingBottom="0px"
      bgColor={palette.secondary}
      style={{ display: "flex" }}
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

      <Container
        className="signup-rigth"
        height="100vh"
        width="65%"
        justifyContent="space-around"
      >
        <Container
          alignItems="flex-start"
          flexGrow={5}
          height="auto"
          width="100%"
          paddingTop={size.largePadding}
          paddingBottom={size.largePadding}
        >
          <Title clasName="title-left" level={1}>
            Datos generales
          </Title>
        </Container>
        <Container
          className="signup-rigth"
          justifyContent="center"
          alignItems="flex-end"
          lateralSpace="50px"
        >
          <GeneralDataForm />
        </Container>
      </Container>
    </FullScreenContainer>
  );
};

export default GeneralData;
