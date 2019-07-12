import React from "react";
import { Typography } from "antd";
import { Link } from "react-router-dom";

import FullScreenContainer from "../../atoms/layout/FullScreenContainer";
import Container from "../../atoms/layout/Container";
import { palette, size } from "../../styles/theme";

function WelcomeEmail() {
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
                Gracias por registrarte
              </Title>
            </div>
          </Container>
          <Container
            alignItems="flex-start text-center"
            flexGrow={5}
            height="auto"
          >
            <Text>
              Bienvenido a la
              <strong> Asociación Mexicana de Gastroenterología</strong>, ahora
              puedes usar tu nueva cuenta y disfrutar de los excelentes
              beneficios que tenemos al pertenecer a esta comunidad.
            </Text>
            <Text strong>
              ¿Vamos a tu cuenta?
              <Link
                style={{ paddingLeft: size.smallPadding, fontWeight: "bold" }}
                to="/login"
              >
                Inicia sesión aquí
              </Link>
            </Text>
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
}

export default WelcomeEmail;
