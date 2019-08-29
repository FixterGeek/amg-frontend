import React from 'react';

import { Form } from 'antd';

import TextField from '../../reusables/TextField';
import ImagePicker from '../../reusables/ImagePicker';

function SignupGeneralDataForm({ dispatch }) {
  return (
    <Form>
      <ImagePicker label="Foto de perfil" />
      <TextField label="Nombre" />
    </Form>
  )
}

export default SignupGeneralDataForm;
