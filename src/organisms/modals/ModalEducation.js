import React, { useState } from 'react';

import { Modal, Typography } from 'antd';

import useSweetAlert from '../../hooks/useSweetAlert';
import useAmgService from '../../hooks/services/useAmgService';
import TextField from '../../molecules/TextFields';
import Button from '../../atoms/Button';
import DatePicker from '../../molecules/DatePicker';
import ModalInstitution from './ModalInstitution';

function ModalEducation({ userId, studies }) {
  const [open, setOpen] = useState(false);
  const [studie, setStudie] = useState({
    user: '',
    major: '',
    institution: '',
    startDate: '',
    endDate: '',
    receptionDate: '',
    profesionalLicence: '',
  });


  const handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;

    setStudie({ ...studie, [name]: value });
  };

  const handleSave = () => {
    //
  };

  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        marginTop="0px"
        marginBottom="0px"
        line>
          Agregar ✚
      </Button>
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
          name="major"
          label="Carreta" />

        <ModalInstitution />

        <DatePicker
          name="startDate"
          label="De"
          width="100%" />
        <DatePicker
          name="endDate"
          label="al"
          width="100%" />
        <DatePicker
          name="receptionDate"
          label="Fecha de titulación"
          width="100%" />
        <TextField
          onChange={handleChange}
          name="professionalLicence"
          label="Licencia profesional" />
      </Modal>
    </div>
  );
}

export default ModalEducation;
