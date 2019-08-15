import React, { useState } from 'react';

import { Typography, Modal, Checkbox } from 'antd';

import ContainerItem from '../../../atoms/DashboardContainerItem';
import Button from '../../../atoms/Button';
import SelectField from '../../../molecules/SelectField';
import TextField from '../../../molecules/TextFields';
import Label from '../../../atoms/data-entry/Label';
import CreateInstitution from '../reusables/CreateInstitution';

function LaboralExperience() {
  const { Title } = Typography;

  const [open, setOpen] = useState(false);

  const handleResult = (error, data) => {
    console.log(error);
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
        <SelectField label="Institución" />
        <CreateInstitution onResult={handleResult} />
        <Label>Es una institución propia</Label>
        <Checkbox />
      </Modal>
    </ContainerItem>
  );
}

export default LaboralExperience;
