import React, { useState, useEffect } from 'react';

import { Modal, Typography, Icon } from 'antd';

import { writeUser } from '../../../store/actions';
import useSweetAlert from '../../../hooks/useSweetAlert';
import useAmgService from '../../../hooks/services/useAmgService';
import TextField from '../../../molecules/TextFields';

function ModalName({ user, dispatch }) {
  const { Title } = Typography;

  const { errorAlert } = useSweetAlert();
  const { updateUser } = useAmgService();
  const [open, setOpen] = useState(false);
  const { basicData = {} } = user;
  const { name, dadSurname, momSurname } = basicData;
  const [fullName, setFullName] = useState({
    name,
    dadSurname,
    momSurname,
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
    // setOpen(false);
    // updateUser(userId, { basicData: { ...basicData, ...fullName } })
    //   .then((data) => {
    //     dispatch(writeUser({ ...data }));
    //   })
    //   .catch((error) => {
    //     errorAlert();
    //     console.log(error);
    //   });
  };

  return (
    <div>
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

export default ModalName;
