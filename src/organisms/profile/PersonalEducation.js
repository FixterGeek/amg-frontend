import React from 'react';

import { Typography } from 'antd';

import DashboardContainerItem from '../../atoms/DashboardContainerItem';
import Button from '../../atoms/Button';

function PersonalEducation({ educations }) {
  const { Title } = Typography;

  return (
    <DashboardContainerItem>
      <DashboardContainerItem className="personal-title">
        <Title>Educación</Title>
        <Button
          marginBottom="0px"
          marginTop="0px"
          width="200px"
          line>
          Agregar ✚
        </Button>
      </DashboardContainerItem>
    </DashboardContainerItem>
  );
}

export default PersonalEducation;
