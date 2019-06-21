import React from 'react';

import { Typography, Button } from 'antd';

import LoginForm from '../../organisms/LoginForm';
import FullScreenContainer from '../../atoms/layout/FullScreenContainer';
import Container from '../../atoms/layout/Container';
import { palette, size } from '../../styles/theme';

function Login() {
  const { Text, Title } = Typography;
  return (
    <FullScreenContainer
      lateralSpace="0px"
      paddingTop="0px"
      paddingBottom="0px"
      flexWrap="nowrap">
      <Container
        className="login-left"
        height="100vh"
        width="50%">
        <Container
          alignItems="flex-start"
          paddingTop={size.largePadding}
          paddingBottom={size.largePadding}
          style={{
            maxWidth: '445px',
            maxHeight: '100vh',
            flexDirection: 'column',
          }}>
          <Text strong style={{ textAlign: 'left' }}>
            Asociación Mexicana de Gastroenterología
          </Text>
          <Container
            flexGrow={1}
            height="100px">
            <div style={{ textAlign: 'center' }}>
              <Title level={2} style={{ margin: 0 }}>Bienvenido </Title>
              <Text>Ingresa a tu cuenta</Text>
            </div>
          </Container>
          <Container
            alignItems="flex-start"
            flexGrow={5}
            height="auto">
            <LoginForm />
            <Text strong>
              ¿No tienes cuenta?
              <Button type="link" style={{ paddingRight: 0, fontWeight: 'bold' }}>
                creala aquí
              </Button>
            </Text>
          </Container>
        </Container>
      </Container>
      <Container
        className="login-right"
        bgColor={palette.secondary}
        height="100vh"
        width="50%">
        <div>
          Logo
        </div>
      </Container>
    </FullScreenContainer>
  );
}

export default Login;
