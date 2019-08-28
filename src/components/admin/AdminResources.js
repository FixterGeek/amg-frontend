import React from 'react';
import { Link } from 'react-router-dom';

import { Typography } from 'antd';

import ContainerItem from '../../atoms/DashboardContainerItem';
import ResourcesTable from '../resources/reusables/ResourcesTable';
import Button from '../../atoms/Button';

function AdminResources() {
  const { Title } = Typography;

  return (
    <section>
      <ContainerItem>
        <Title>Recursos</Title>
        <Link to="/admin/resources/edit">
          <Button line>
            Agregar
          </Button>
        </Link>
      </ContainerItem>
      <ContainerItem>
          <Title level={3}>Ultimos recursos</Title>
      </ContainerItem>
      <ContainerItem>
        <ResourcesTable />
      </ContainerItem>
    </section>
  );
}

export default AdminResources;
