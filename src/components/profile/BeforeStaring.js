import React from "react";
//import { Link } from "react-router-dom";

import { Typography } from "antd";

import FullScreenContainer from "../../atoms/layout/FullScreenContainer";
import Container from "../../atoms/layout/Container";
import { palette, size } from "../../styles/theme";

const BeforeStaring = () => {
  const { Text, Title } = Typography;
  return (
    <FullScreenContainer
      lateralSpace="0px"
      paddingTop="0px"
      paddingBottom="0px"
      flexWrap="nowrap"
    >
      <Container className="login-left" height="100vh" width="50%">
        <Container
          alignItems="flex-start"
          paddingTop={size.largePadding}
          paddingBottom={size.largePadding}
          style={{
            maxWidth: "445px",
            maxHeight: "100vh",
            flexDirection: "column"
          }}
        >
          <Container flexGrow={1} height="100px">
            <div style={{ textAlign: "center" }}>
              <Title level={2} style={{ margin: 0 }}>
                Registro
              </Title>
              <Text>Bienvenido</Text>
            </div>
          </Container>
          <Container alignItems="flex-start" flexGrow={5} height="auto">
            <Text strong>¿No tienes cuenta?</Text>
          </Container>
        </Container>
      </Container>
      <Container
        className="login-right"
        bgColor={palette.secondary}
        height="100vh"
        width="50%"
      >
        <div className="login-bg">
          <div className="login-logo" />
        </div>
      </Container>
    </FullScreenContainer>
  );
};

export default BeforeStaring;
