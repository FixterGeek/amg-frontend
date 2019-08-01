import React from 'react';

import { Typography } from 'antd';

import DashboardContainerItem from '../../atoms/DashboardContainerItem';

function Settings() {
  const { Title } = Typography;
  return (
    <div className="dashboard-container">
      <DashboardContainerItem>
        <Title>Ajustes de la cuenta</Title>
      </DashboardContainerItem>
    </div>
  );
}

export default Settings;
