import React from 'react';
import { Link } from 'react-router-dom';

import { Typography } from 'antd';

import LoginForm from '../../organisms/LoginForm';
import FullScreenContainer from '../../atoms/layout/FullScreenContainer';
import Container from '../../atoms/layout/Container';
import { palette, size } from '../../styles/theme';
import log from "../../assets/LOGO-COMPLETO.svg";

function Login() {
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
            maxWidth: '445px',
            maxHeight: '100vh',
            flexDirection: 'column',
          }}
        >
          <Link to="/">
            <img src={log} alt="logo-oficial"/>
          </Link>
          <Container flexGrow={1} height="100px">
            <div style={{ textAlign: 'center' }}>
              <Title level={2} style={{ margin: 0 }}>
                Bienvenido
              </Title>
              <Text>Ingresa a tu cuenta</Text>
            </div>
          </Container>
          <Container alignItems="flex-start" flexGrow={5} height="auto">
            <LoginForm />
            <Text strong>
              ¿No tienes cuenta?
              <Link
                style={{ paddingLeft: size.smallPadding, fontWeight: 'bold' }}
                to="/pre-signup">
                  creala aquí
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
        <div className="login-lib">
          <div className="cover">
            <div className="login-logo" />
          </div>
        </div>
      </Container>
    </FullScreenContainer>
  );
}

export default Login;
