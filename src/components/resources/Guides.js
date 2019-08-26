import React from 'react';

import { Typography } from 'antd';

import ContainerItem from '../../atoms/DashboardContainerItem';
import ResourcesTable from './reusables/ResourcesTable'

function Guides() {
  const { Title } = Typography;

  const handleSearch = (value) => {
    console.log(value)
  };

  return (
    <div className="dashboard-container">
      <Title>Guías y consensos</Title>
      <ContainerItem>
        <ResourcesTable onSearch={handleSearch} />
      </ContainerItem>
    </div>
  )
}

export default Guides;
