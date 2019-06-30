import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Button } from 'antd';

import { writeUser } from '../store/actions';
import useAmgService from '../hooks/services/useAmgService';
import TextField from '../molecules/TextFields';
import AmgButton from '../atoms/Button';
import Spinner from '../atoms/Spinner';

function LoginForm(props) {
  // eslint-disable-next-line react/prop-types
  const { history } = props;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    email: false,
    password: false,
  });
  // eslint-disable-next-line react/prop-types
  const { user, dispatch } = props;
  const { login } = useAmgService();

  const handleChange = (event) => {
    const { target: { value, name } } = event;
    dispatch(writeUser({ [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    login(user.email, user.password)
      .then(async ({ data }) => {
        await dispatch(writeUser({ ...data.user, userToken: data.token }));
        await setLoading(false);
        await localStorage.setItem('authToken', data.token);
        history.push('/dashboard');
      })
      .catch(() => {
        setLoading(false);
        setError({ email: true, password: true });
      });
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      { loading && <Spinner tip="Iniciando sesión..." />}
      <TextField
        width="100%"
        error={error.email}
        errorMessage="Email o password incorrectos"
        value={user.email}
        onChange={handleChange}
        name="email"
        label="Correo" />
      <TextField
        width="100%"
        error={error.password}
        errorMessage="Email o password incorrectos"
        value={user.password}
        onChange={handleChange}
        name="password"
        type="password"
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

function mapStateToProps(state) {
  return { user: state.user };
}

export default withRouter(connect(mapStateToProps)(LoginForm));
