import React from 'react';
import { connect } from 'react-redux';

import { Button } from 'antd';

import { writeUser } from '../store/actions';
import TextField from '../molecules/TextFields';
import AmgButton from '../atoms/Button';

function LoginForm(props) {
  // eslint-disable-next-line react/prop-types
  const { user, dispatch } = props;

  const handleChange = (event) => {
    const { target: { value, name } } = event;
    dispatch(writeUser({ [name]: value }));
  };

  console.log(user);

  return (
    <div className="login-form">
      <TextField
        width="100%"
        value={user.email}
        onChange={handleChange}
        name="email"
        label="Correo" />
      <TextField
        width="100%"
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
        width="100%">
        Iniciar sesión
      </AmgButton>
    </div>
  );
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(LoginForm);
