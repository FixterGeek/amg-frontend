import React, { useState } from 'react';

import { Typography, Modal, Checkbox } from 'antd';

import ContainerItem from '../../../atoms/DashboardContainerItem';
import Button from '../../../atoms/Button';
import CreateInstitution from '../reusables/CreateInstitutionModal';
import LaboralForm from '../reusables/LaboralForm';

function LaboralExperience() {
  const { Title } = Typography;

  const [open, setOpen] = useState(false);

  const handleResult = (error, data) => {
    console.log(error);
    console.log(data);
  };

  const handleForm = (data) => {
    console.log(data);
  };

  return (
    <ContainerItem className="relative">
      <Title level={2}>Expericncia profesional</Title>
      <Button onClick={() => setOpen(true)} marginTop="0px" className="reusable-save-button" line>
        Agregar
      </Button>

      <Modal
        visible={open}
        onCancel={() => setOpen(false)}
      >
        <LaboralForm onChange={handleForm} />
        <CreateInstitution onResult={handleResult} />
      </Modal>
    </ContainerItem>
  );
}

export default LaboralExperience;
