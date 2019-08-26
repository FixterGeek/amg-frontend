import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Typography } from 'antd';

import LoginForm from './LoginForm';
import { size } from '../../styles/theme';
import log from "../../assets/LOGO-COMPLETO.svg";

function Login({ history }) {
  const { Text, Title } = Typography;
  const { location } = history;

  const [resetPassword, setResetPassword] = useState(false)


  useEffect(() => {
    if (location.pathname.split('/')[2] === 'reset') setResetPassword(true)
  }, []);

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
                { resetPassword ? 'Recuperar contraseña' : 'Bienvenido' }
              </Title>
              <Text>
                { resetPassword ? 'Ingresa a tu correo para restaurar tu cuenta' : 'Ingresa a tu cuenta' }
              </Text>
            </div>
          </div>
          <div className="component-login-form">
            <LoginForm
              resetPassword={resetPassword}
              setResetPassword={setResetPassword}
              className="component-login-form" />
            
            {
              !resetPassword && (
                <Text strong>
                  ¿No tienes cuenta?
                  <Link
                    style={{ paddingLeft: size.smallPadding, fontWeight: 'bold' }}
                    to="/pre-signup">
                      creala aquí
                  </Link>
              </Text>
              )
            }
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
