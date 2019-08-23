import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';

import { Button } from 'antd';

import TextField from '../molecules/TextFields';
import AmgButton from '../atoms/Button';
import Spinner from '../atoms/Spinner';

//redux
import { connect } from 'react-redux';
import { loginUser } from '../store/ducks/userDuck'

function LoginForm({
  resetPassword = false , setResetPassword, history,
  fetching, isLogged, error, className, loginUser
}) {
  // eslint-disable-next-line react/prop-types
  const [auth, setAuth] = useState({
    email: null,
    password: null,
  });

  useEffect(() => {
    if (isLogged) history.push("/dashboard/events")
  }, [isLogged]);

  const handleChange = (event) => {
    const { target: { value, name } } = event;
    setAuth({ ...auth, [name]: value })
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    loginUser(auth)
  };

  return (
    <form onSubmit={handleSubmit} className={`${className}`}>
      {fetching && <Spinner tip="Iniciando sesión..." />}
      <TextField
        style={{ width: '100%' }}
        // error={error}
        // errorMessage={error}
        value={auth.email}
        onChange={handleChange}
        name="email"
        label="Correo" />
      <TextField
        password
        style={{ width: '100%' }}
        error={error}
        errorMessage={error}
        value={auth.password}
        onChange={handleChange}
        name="password"
        label="Contraseña"
        marginBottom="0px" />
      <div>
        <Link to={!resetPassword ? '/login/reset' : '/login'}>
          { resetPassword ? 'Ir al login' : '¿Olvidaste tu contraseña' }
        </Link>
      </div>
      <AmgButton
        htmlType="submit"
        width="100%">
        { resetPassword ? 'Restablecer' : 'Ingresa a tu correo para restaurar tu cuenta' }
      </AmgButton>
    </form>
  );
}

function mapStateToProps({ user }) {
  return { ...user };
}

export default withRouter(connect(mapStateToProps, { loginUser })(LoginForm));
