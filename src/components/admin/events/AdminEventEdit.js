import React, { useState, useEffect } from 'react';

import { Tabs, Typography } from 'antd';

import ContainerItem from '../../reusables/ContainerItem';
import AdminEventForm from './AdminEventForm';
import AdminEventMap from './AdminEventMap';

function AdminEventEdit({
  match
}) {
  const { Title } = Typography;
  const { TabPane } = Tabs;

  const [sectionTitle, setSectionTitle] = useState('Nuevo evento')

  useEffect(() => {
    const { params = {} } = match;
    if (params.id) setSectionTitle('Modificar evento');
  }, []);

  return (
    <div className="admin-event-form-container">
      <Title>{ sectionTitle }</Title>
      <ContainerItem>
        <Tabs type="line">
          <TabPane key="1" tab="Datos Generales" style={{ position: 'relative' }}>
            <AdminEventForm />
          </TabPane>
          <TabPane key="2" tab="Ponentes">
            adminform
          </TabPane>
          <TabPane key="3" tab="Modulos">
            modulos
          </TabPane>
          <TabPane key="4" tab="Portadas">
            modulos
          </TabPane>
          <TabPane key="5" tab="Mapa">
            <AdminEventMap />
          </TabPane>
        </Tabs>
      </ContainerItem>
    </div>
  );
}

export default AdminEventEdit;
