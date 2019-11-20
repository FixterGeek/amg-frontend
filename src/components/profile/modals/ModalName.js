import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import toFormData from 'object-to-formdata';

import { Modal, Typography, Icon } from 'antd';

import { writeUser } from '../../../store/actions';
import { updateUserAction } from '../../../store/ducks/userDuck';
import useSweetAlert from '../../../hooks/useSweetAlert';
import useAmgService from '../../../hooks/services/useAmgService';
import TextField from '../../../molecules/TextFields';
import Spinner from '../../reusables/Spinner';

function ModalName({
  user, dispatch, updateUserAction,
  fetching,
}) {
  const { Title } = Typography;

  const [open, setOpen] = useState(false);
  const { basicData = {} } = user;
  const { name, dadSurname, momSurname } = basicData;
  const [fullName, setFullName] = useState({
    name: name || '',
    dadSurname: dadSurname || '',
    momSurname: momSurname || '',
  });


  useEffect(() => {
    setFullName({ name, dadSurname, momSurname });
  }, [name, dadSurname, momSurname]);

  const handleChange = (event) => {
    const { target } = event;
    const { name: inputName, value } = target;

    setFullName({ ...fullName, [inputName]: value });
  };

  const handleSave = () => {
    const st = user;
    if (!st.membersWhoRecommend[0]) delete st.membersWhoRecommend;
    if (!st.enrolledActivities[0]) delete st.enrolledActivities;
    if (!st.enrolledCourses[0]) delete st.enrolledCourses;
    if (!st.residencies[0]) delete st.residencies;
    if (!st.internships[0]) delete st.internships;
    if (!st.followers[0]) delete st.followers;
    if (!st.following[0]) delete st.following;
    if (!st.consultories[0]) delete st.consultories;
    if (!st.eventOrders[0]) delete st.eventOrders;
    if (!st.assistedEvents[0]) delete st.assistedEvents;
    if (!st.assistedActivities[0]) delete st.assistedActivities;
    if (!st.courseOrders[0]) delete st.courseOrders;
    if (!st.hospitalActivities[0]) delete st.hospitalActivities;
    if (!st.renewals[0]) delete st.renewals;


    const formdata = toFormData({ ...st, basicData: { ...st.basicData, ...fullName } })
    updateUserAction(formdata)
      .then(data => console.log(data))
      .catch(error => console.log(error));
  };

  return (
    <div>
      { fetching && <Spinner fullScrren /> }
      <Title level={4}>
        {`${name} ${dadSurname} ${momSurname}`}
        <Icon className="edit-icon" type="edit" onClick={() => setOpen(true)} />
      </Title>
      <Modal
        onOk={handleSave}
        onCancel={() => setOpen(false)}
        okButtonProps={{ className: 'amg-button' }}
        cancelButtonProps={{ className: 'amg-button', style: { backgroundColor: '#e24c4c' } }}
        okText="Actualizar"
        cancelText="Cancelar"
        visible={open}
        title="Editar nombre de usuario">
        <TextField
          onChange={handleChange}
          name="name"
          label="Nombre"
          value={fullName.name} />
        <TextField
          onChange={handleChange}
          name="dadSurname"
          label="Apellido paterno"
          value={fullName.dadSurname} />
        <TextField
          onChange={handleChange}
          name="momSurname"
          label="Apellido materno"
          value={fullName.momSurname} />
      </Modal>
    </div>
  );
}

function mapStateToProps({ user }) {
  return { fetching: user.fetching }
}

export default connect(
  null, {
    updateUserAction,
  }
)(ModalName);
