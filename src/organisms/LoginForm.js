import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { Button } from 'antd';

import TextField from '../molecules/TextFields';
import AmgButton from '../atoms/Button';
import Spinner from '../atoms/Spinner';

//redux
import { connect } from 'react-redux';
import { loginUser } from '../store/ducks/userDuck'

function LoginForm(props) {
  // eslint-disable-next-line react/prop-types
  const { history, fetching, isLogged, error } = props;
  const [auth, setAuth] = useState({
    email: null,
    password: null,
  });

  useEffect(() => {
    if (isLogged) history.push("/dashboard")
  }, [isLogged]);

  const handleChange = (event) => {
    const { target: { value, name } } = event;
    setAuth({ ...auth, [name]: value })
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.loginUser(auth)
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      {fetching && <Spinner tip="Iniciando sesión..." />}
      <TextField
        width="100%"
        // error={error}
        // errorMessage={error}
        value={auth.email}
        onChange={handleChange}
        name="email"
        label="Correo" />
      <TextField
        password
        width="100%"
        error={error}
        errorMessage={error}
        value={auth.password}
        onChange={handleChange}
        name="password"
        label="Contraseña"
        marginBottom="0px" />
      <div>
        <Button type="link" style={{ padding: 0 }}>
          ¿Olvidaste tu contraseña?
        </Button>
      </div>
      <AmgButton
        htmlType="submit"
        width="100%">
        Iniciar sesión
      </AmgButton>
    </form>
  );
}

function mapStateToProps({ user }) {
  return { ...user };
}

export default withRouter(connect(mapStateToProps, { loginUser })(LoginForm));
