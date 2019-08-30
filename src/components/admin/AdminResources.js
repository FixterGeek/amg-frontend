import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Typography, Tabs } from 'antd';

import {
  populateResourcesAction,
  resetStatus,
  deleteResourceAction,
} from '../../store/ducks/resourceDuck';
import useSweet from '../../hooks/useSweetAlert';
import ContainerItem from '../../atoms/DashboardContainerItem';
import ResourcesTable from '../resources/reusables/ResourcesTable'; // From public section components
import Button from '../../atoms/Button';
import Spinner from '../reusables/Spinner';

function AdminResources({
  allResources, guides, publications, populateResourcesAction,
  status, resetStatus, deleteResourceAction, fetching,
}) {
  const { Title } = Typography;
  const { TabPane } = Tabs;
  const baseClassName = 'admin-resources'

  const { errorAlert } = useSweet();

  useEffect(() => {
    if (status === 'success') resetStatus();
    if (status === 'error') errorAlert({});
  }, [status]);

  useEffect(() => {
    if (!allResources[0]) populateResourcesAction();
  }, [])

  return (
    <section className={baseClassName}>
      <ContainerItem className={`${baseClassName}-title`}>
        <Title>Recursos</Title>
        <Link to="/admin/resources/edit">
          <Button marginTop="0px" line>
            Crear recurso ✚
          </Button>
        </Link>
      </ContainerItem>
      <ContainerItem>
          <Title level={3}>Ultimos recursos</Title>
      </ContainerItem>
      <ContainerItem style={{ position: 'relative' }}>
        { fetching && <Spinner /> }
        {/*Tabs for types */}
        <Tabs type="card" className={`${baseClassName}-tabs`}>
          <TabPane tab="Guías y consensos" key="1">
            {/* For guides library */}
            <ResourcesTable
              admin
              data={guides}
              dispatchDelete={deleteResourceAction}
              emptyText="No hay guías y consensos"
            />
          </TabPane>
          <TabPane tab="Publicaciones" key="2">
            {/* For publications library */}
            <ResourcesTable
              admin
              data={publications}
              dispatchDelete={deleteResourceAction}
              emptyText="No hay publicaciones"
            />
          </TabPane>
        </Tabs>
      </ContainerItem>
    </section>
  );
}

function mapSateToProps({ resources }) {
  return {
    allResources: resources.array,
    guides: resources.guides,
    publications: resources.publications,
    status: resources.status,
    fetching: resources.fetching,
  }
}

export default connect(
  mapSateToProps, {
    populateResourcesAction,
    resetStatus,
    deleteResourceAction,
  }
)(AdminResources);
