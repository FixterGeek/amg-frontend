import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Typography } from 'antd'

import { populateResourcesAction } from '../../store/ducks/resourceDuck';
import ContainerItem from '../../atoms/DashboardContainerItem';
import ResourcesTable from './reusables/ResourcesTable';
import Spinner from '../reusables/Spinner';

function Posts({
  publications, array, fetching,
  status, populateResourcesAction,
  noData,
}) {
  const { Title } = Typography;

  useEffect(() => {
    if (!array[0] && !noData) populateResourcesAction()
  }, [])

  const handleSearch = (value) => {
    console.log(value)
  }

  return (
    <div className="dashboard-container">
      <Title>Publicaciones</Title>
      <ContainerItem style={{ position: 'relative' }} >
        { fetching && <Spinner /> }
        <ResourcesTable
          onSearch={handleSearch}
          data={publications}
          emptyText="No hay publicaciones disponibles"
        />
      </ContainerItem>
    </div>
  )
}

function mapStateToProps({ resources }) {
  return {
    publications: resources.publications,
    array: resources.array,
    fetching: resources.fetching,
    status: resources.status,
    noData: resources.noData,
  }
}

export default connect(
  mapStateToProps, {
    populateResourcesAction,
  }
)(Posts);
