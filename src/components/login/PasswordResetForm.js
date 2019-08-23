import React from 'react';

import TextField from '../../molecules/TextFields'

function PasswordResetForm() {
  return (
    <form>
      <TextField label="Correo" />
      <TextField label="Contraseña" />
    </form>
  )
}

export default PasswordResetForm
