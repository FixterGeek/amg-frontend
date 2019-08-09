import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import { Button } from 'antd';

import { writeUser } from '../redux/actions';
import useAmgService from '../hooks/services/useAmgService';
import TextField from '../molecules/TextFields';
import AmgButton from '../atoms/Button';
import Spinner from '../atoms/Spinner';

//redux
import { connect } from 'react-redux';
import { loginUserAction } from '../store/ducks/userDuck'

function LoginForm(props) {
  // eslint-disable-next-line react/prop-types
  const { history } = props;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    email: false,
    password: false,
  });
  const [auth, setAuth] = useState({
    email: null,
    password: null,
  });
  // eslint-disable-next-line react/prop-types
  const { user, dispatch } = props;
  const { login } = useAmgService();

  const handleChange = (event) => {
    const { target: { value, name } } = event;
    setAuth({ ...auth, [name]: value })
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    props.loginUserAction(auth)

      // login(user.email, user.password)
      .then(data => {
        setLoading(false);
        history.push('/dashboard');
      })
      .catch(({ response }) => {
        const { data } = response;
        if (data.name === 'IncorrectPasswordError') setError({ password: true, email: false });
        if (data.name === 'IncorrectUsernameError') setError({ email: true, password: false });
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      {loading && <Spinner tip="Iniciando sesión..." />}
      <TextField
        width="100%"
        error={error.email}
        errorMessage="Correo incorrecto."
        value={auth.email}
        onChange={handleChange}
        name="email"
        label="Correo" />
      <TextField
        width="100%"
        error={error.password}
        errorMessage="Contraseña incorrecta."
        value={auth.password}
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

export default withRouter(connect(mapStateToProps, { loginUserAction })(LoginForm));
