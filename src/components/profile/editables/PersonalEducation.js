import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Typography, Modal } from 'antd';

import { createEducationAction } from '../../../store/ducks/educationDuck';
import DashboardContainerItem from '../../../atoms/DashboardContainerItem';
import Button from '../../../atoms/Button';
import EducationForm from '../reusables/EducationForm';

function PersonalEducation({ user, externalUser = null, createEducationAction }) {
  const { Title } = Typography;

  const [open, setOpen] = useState(false);
  const [education, setEducation] = useState();

  const handleSave = () => {
    if (education.type === 'Estudios') createEducationAction('studies', education);
    if (education.type === 'Recidencia') createEducationAction('residences', education);
    if (education.type === 'Internado') createEducationAction('internships', education);
    setOpen(false);
  };

  const handleEducationForm = (data) => {
    setEducation(data);
  }


  return (
    <DashboardContainerItem className="component-profile-personal-education">
      <div className="component-profile-personal-education-header">
        <Title>Educación</Title>
        <Button onClick={() => setOpen(true)} marginTop="0px" width="180px" line>
          Agregar ✚
        </Button>
      </div>

      <Modal
        visible={open}
        onOk={handleSave}
        onCancel={() => setOpen(false)}
        okButtonProps={{ className: 'amg-button amg-button-secondary' }}
        cancelButtonProps={{ className: 'amg-button amg-button-outline-secondary' }}
        okText="Aceptar"
        cancelText="Cancelar"
      >
        <EducationForm user={externalUser || user} onChange={handleEducationForm} />
      </Modal>
    </DashboardContainerItem>
  );
}

function mapStateToProps({ user }) {
  return { 
    user,
  };
}

export default connect(mapStateToProps, { createEducationAction })(PersonalEducation);
