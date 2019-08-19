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
    <div className="component-login">
      <div className="component-login-left">
        <div className="component-login-form-container">
          <Link to="/" className="component-login-logo">
            <img src={log} alt="logo-oficial"/>
          </Link>
          <div>
            <div style={{ textAlign: 'center' }}>
              <Title level={2} style={{ margin: 0 }}>
                Bienvenido
              </Title>
              <Text>Ingresa a tu cuenta</Text>
            </div>
          </div>
          <div className="component-login-form">
            <LoginForm className="component-login-form" />
            <Text strong>
              ¿No tienes cuenta?
              <Link
                style={{ paddingLeft: size.smallPadding, fontWeight: 'bold' }}
                to="/pre-signup">
                  creala aquí
              </Link>
            </Text>
          </div>
        </div>
      </div>
      <div className="component-login-rigth">
        <div className="login-lib">
          <div className="cover">
            <div className="login-logo" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
