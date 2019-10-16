import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { Form, Radio } from 'antd';

import { updateUser, setWorkingOn, writeWorkingOn } from '../../../store/ducks/users';
import TextField from '../../reusables/TextField';
import CheckboxField from '../../reusables/CheckboxField';
import Button from '../../reusables/Button';

function AdminUserStatesForm({
  user,
  workingOn,
  setWorkingOn,
  writeWorkingOn,
  updateUser,
}) {
  useEffect(() => {
    if (user._id) setWorkingOn(user);
  }, [user]);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateUser(workingOn);
  };

  return (
    <Form className="admin-users-states-form" onSubmit={handleSubmit}>
      <TextField
        label="Fecha de registro"
        value={moment(user.createdAt).format('DD/MM/YY[ - ]hh:mm a')}
      />
      <Form.Item label="Tipo de usuario">
        <Radio.Group
          onChange={({ target }) => writeWorkingOn('userType', target.value)}
          value={workingOn.userType} >
          <Radio value="Member">Miembro</Radio>
          <Radio value="Editor">Editor</Radio>
          <Radio value="Admin">Administrador</Radio>
          <Radio value="Subsidiary">Filial</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Membresia">
        <Radio.Group
          onChange={({ target }) => writeWorkingOn('membershipStatus', target.value)}
          value={workingOn.membershipStatus} >
          <Radio value="Free">No socio</Radio>
          <Radio value="Residente">Socio en entrenamiento</Radio>
          <Radio value="Socio">Socio</Radio>
          <Radio value="Veterano">Veterano</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Estado de registro">
        <Radio.Group
          onChange={({ target }) => writeWorkingOn('userStatus', target.value)}
          value={workingOn.userStatus} >
          <Radio value="Registrado">Registrado</Radio>
          <Radio value="Pendiente">Pendiente</Radio>
          <Radio value="Aprobado">Aprobado</Radio>
          <Radio value="No Aprobado">No Aprobado</Radio>
        </Radio.Group>
      </Form.Item>
      <CheckboxField
        onChange={arr => writeWorkingOn('selectables', arr)}
        value={workingOn.selectables}
        label="Planes elegibles"
        checks={[
          { label: 'Socio en entrenamiento', value: 'Residente' },
          { label: 'Socio', value: 'Socio' },
        ]}
      />
      <Button width="100%" htmlType="submit">
        Actualizar
      </Button>
    </Form>
  );
}

function mapStateToProps({ users }, { userId }) {
  return {
    user: users.array.filter(u => u._id === userId)[0] || {},
    workingOn: users.workingOn,
  };
}

export default connect(
  mapStateToProps, {
    setWorkingOn,
    writeWorkingOn,
    updateUser,
  }
)(AdminUserStatesForm);
