import React from 'react';

import { Typography } from 'antd'
import ContainerItem from '../../atoms/DashboardContainerItem';
import ResourceItem from './reusables/ResourceItem'

function Resources() {
  const { Title } = Typography;
  return (
    <div className="dashboard-container  component-resources">
      <Title>Recursos</Title>
      <ContainerItem className="component-resources-item">
        <ResourceItem
          to="/dashboard/recursos/guias"
          title="Guias y consensos"
          preview="https://res.cloudinary.com/dlopomjr5/image/upload/v1566795283/amg-examples/guias.jpg"
        />
        <ResourceItem
          to="/dashboard/recursos/publicaciones"
          title="Publicaciones"
          preview="https://res.cloudinary.com/dlopomjr5/image/upload/v1566795283/amg-examples/pubs.jpg"
        />
      </ContainerItem>
    </div>
  )
}

export default Resources;
