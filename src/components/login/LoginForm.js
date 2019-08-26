import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';

import { resetPassword as resetService } from '../../services/userServices'
import useSweet from  '../../hooks/useSweetAlert'
import TextField from '../../molecules/TextFields';
import AmgButton from '../../atoms/Button';
import Spinner from '../../atoms/Spinner';

//redux
import { connect } from 'react-redux';
import { loginUser } from '../../store/ducks/userDuck'

function LoginForm({
  resetPassword = false , history,
  fetching, isLogged, error, className, loginUser
}) {
  const { successAlert, errorAlert } = useSweet();
  const [reseting, setReseting] = useState(false)
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
    if (resetPassword) {
      setReseting(true)
      resetService({ email: auth.email })
        .then((data) => {
          setReseting(false)
          history.push('/login');
          successAlert({ text: 'Hemos enviado un link a tu correo, para restablecer tu contraseña' })
        })
        .catch((error) => {
          setReseting(false)
          history.push('/login');
          errorAlert({ text: error.response.data.message, footer: 'Verifica tus datos' })
        })
    } else loginUser(auth)
  };

  return (
    <form onSubmit={handleSubmit} className={`${className}`}>
      {fetching || reseting ? <Spinner /> : null}
      <TextField
        style={{ width: '100%' }}
        // error={error}
        // errorMessage={error}
        value={auth.email}
        onChange={handleChange}
        name="email"
        label="Correo" />
      {
        !resetPassword ? (
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
        ) : null
      }
      <div>
        <Link to={!resetPassword ? '/login/reset' : '/login'}>
          { resetPassword ? 'Ir al login' : '¿Olvidaste tu contraseña' }
        </Link>
      </div>
      <AmgButton
        htmlType="submit"
        width="100%">
        { resetPassword ? 'Restablecer' : 'Iniciar sesión' }
      </AmgButton>
    </form>
  );
}

function mapStateToProps({ user }) {
  return { ...user };
}

export default withRouter(connect(mapStateToProps, { loginUser })(LoginForm));
