import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Typography, Modal } from 'antd';

import { pushLastInstitution } from '../../../store/ducks/institutionsDuck';
import { createActivityAction } from '../../../store/ducks/activitiesDuck';
import ContainerItem from '../../../atoms/DashboardContainerItem';
import Button from '../../../atoms/Button';
import CreateInstitution from '../reusables/CreateInstitutionModal';
import LaboralForm from '../reusables/LaboralForm';

function LaboralExperience({ user, createActivityAction, pushLastInstitution }) {
  const { Title } = Typography;

  const [open, setOpen] = useState(false);
  const [activity, setActivity] = useState();
  const [lastInstitution, setLastInstitution] = useState();

  const handleResult = (error, data) => {
    if (data) {
      setLastInstitution(data._id);
    }
  };

  const handleForm = (data) => {
    setActivity(data);
  };

  const handleSave = () => {
    createActivityAction(activity);
    setOpen(false);
  };

  return (
    <ContainerItem className="relative">
      <Title>Experiencia profesional</Title>
      <Button onClick={() => setOpen(true)} marginTop="0px" className="reusable-save-button" line>
        Agregar ✚
      </Button>

      <Modal
        visible={open}
        onOk={handleSave}
        onCancel={() => setOpen(false)}
      >
        <LaboralForm lastInstitution={lastInstitution} onChange={handleForm} />
        <CreateInstitution user={user} onResult={handleResult} />
      </Modal>
    </ContainerItem>
  );
}

function mapStateToProps({ activities, user }) {
  return {
    activities,
    user
  };
}

export default connect(
  mapStateToProps, { createActivityAction, pushLastInstitution },
)(LaboralExperience);
