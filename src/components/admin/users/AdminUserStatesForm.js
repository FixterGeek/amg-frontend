import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { Form, Radio } from 'antd';

import { updateUser, setWorkingOn, writeWorkingOn } from '../../../store/ducks/users';
import { populateSubsidiaries } from '../../../store/ducks/subsidiaryDuck';
import TextField from '../../reusables/TextField';
import CheckboxField from '../../reusables/CheckboxField';
import Button from '../../reusables/Button';
import SelectField, { OptionSelect } from '../../reusables/SelectField';

function AdminUserStatesForm({
  user, subsidiaries, noSubsidiaries,
  workingOn,
  setWorkingOn,
  writeWorkingOn,
  updateUser,
  populateSubsidiaries,
}) {
  useEffect(() => {
    if (user._id) setWorkingOn(user);
  }, [user]);

  useEffect(() => {
    if (!subsidiaries[0] && !noSubsidiaries) populateSubsidiaries();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateUser({ ...workingOn, revisionDate: moment().toString() });
  };

  console.log(subsidiaries);

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
          <Radio value="Admin">Administrador</Radio>
          <Radio value="Filial">Filial</Radio>
        </Radio.Group>
      </Form.Item>
      {
        workingOn.userType === 'Filial' && (
          <SelectField>
            {
              subsidiaries.map(s => (
                <OptionSelect key={s._id} value={s._id} >
                  { s.state }
                </OptionSelect>
              ))
            }
          </SelectField>
        )
      }
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
      {
        workingOn.userStatus === 'Aprobado' && (
          <CheckboxField
            onChange={arr => writeWorkingOn('selectables', arr)}
            value={workingOn.selectables}
            label="Planes elegibles"
            checks={[
              { label: 'Socio en entrenamiento', value: 'Residente' },
              { label: 'Socio', value: 'Socio' },
            ]}
          />
        )
      }
      <Button width="100%" htmlType="submit">
        Actualizar
      </Button>
    </Form>
  );
}

function mapStateToProps({ users, subsidiary }, { userId }) {
  return {
    user: users.array.filter(u => u._id === userId)[0] || {},
    workingOn: users.workingOn,
    subsidiaries: subsidiary.array,
    noSubsidiaries: subsidiary.noData,
  };
}

export default connect(
  mapStateToProps, {
    setWorkingOn,
    writeWorkingOn,
    updateUser,
    populateSubsidiaries,
  }
)(AdminUserStatesForm);
