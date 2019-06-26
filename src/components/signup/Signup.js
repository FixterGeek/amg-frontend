import React from "react";

import { Typography } from "antd";

import SignupForm from "../../organisms/SignupForm";
import FullScreenContainer from "../../atoms/layout/FullScreenContainer";
import Container from "../../atoms/layout/Container";
import Gastro from "../../atoms/gastro/Gastro";
import { palette, size } from "../../styles/theme";
import Steper from "../../organisms/steper/Steper";

export default () => {
  const { Text, Title } = Typography;
  return (
    <FullScreenContainer
      lateralSpace="0px"
      paddingTop="0px"
      paddingBottom="0px"
      flexWrap="nowrap"
    >
      {/* Separamos en 2 columnas */}
      <Container className="signup-left" height="100vh" width="30%">
        <Container bgColor={palette.secondary}>
          <Container>
            <Gastro />
            <Steper />
          </Container>
          <Container />
        </Container>
      </Container>

      <Container className="signup-right" height="100vh" width="70%">
        <Container
          alignItems="flex-start"
          paddingTop={size.largePadding}
          paddingBottom={size.largePadding}
          style={{
            maxWidth: "445px",
            maxHeight: "100vh",
            flexDirection: "column"
          }}
          width="30%"
        />
        <Container width="70%">
          <Container flexGrow={1} height="100px">
            <div style={{ textAlign: "center" }}>
              <Title level={2} style={{ margin: 0 }}>
                Datos generales{" "}
              </Title>
            </div>
          </Container>
          <SignupForm />
        </Container>
      </Container>
    </FullScreenContainer>
  );
};
