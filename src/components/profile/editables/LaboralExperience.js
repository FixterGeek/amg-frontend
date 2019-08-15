import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Typography, Modal } from 'antd';

import { createActivityAction } from '../../../store/ducks/activitiesDuck';
import ContainerItem from '../../../atoms/DashboardContainerItem';
import Button from '../../../atoms/Button';
import CreateInstitution from '../reusables/CreateInstitutionModal';
import LaboralForm from '../reusables/LaboralForm';

function LaboralExperience({ createActivityAction }) {
  const { Title } = Typography;

  const [open, setOpen] = useState(false);
  const [activity, setActivity] = useState();

  const handleResult = (error, data) => {
    console.log(error);
    console.log(data);
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
      <Title level={2}>Expericncia profesional</Title>
      <Button onClick={() => setOpen(true)} marginTop="0px" className="reusable-save-button" line>
        Agregar
      </Button>

      <Modal
        visible={open}
        onOk={handleSave}
        onCancel={() => setOpen(false)}
      >
        <LaboralForm onChange={handleForm} />
        <CreateInstitution onResult={handleResult} />
      </Modal>
    </ContainerItem>
  );
}

function mapStateToProps({ activities }) {
  return {
    activities,
  };
}

export default connect(mapStateToProps, { createActivityAction })(LaboralExperience);
