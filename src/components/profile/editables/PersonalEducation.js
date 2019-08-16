import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Typography, Modal } from 'antd';

import DashboardContainerItem from '../../../atoms/DashboardContainerItem';
import Button from '../../../atoms/Button';
import EducationForm from '../reusables/EducationForm';

function PersonalEducation({ user }) {
  const { Title } = Typography;

  const [open, setOpen] = useState(false);

  const handleSave = () => {

  };

  return (
    <DashboardContainerItem className="personal-title  relative">
      <Title>Educación</Title>
      <Button onClick={() => setOpen(true)} marginTop="0px" className="reusable-save-button" line>
        Agregar
      </Button>

      <Modal
        visible={open}
        onOk={handleSave}
        onCancel={() => setOpen(false)}
      >
        <EducationForm />
        {/* <LaboralForm lastInstitution={lastInstitution} onChange={handleForm} />
        <CreateInstitution user={user} onResult={handleResult} /> */}
      </Modal>
    </DashboardContainerItem>
  );
}

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps)(PersonalEducation);
