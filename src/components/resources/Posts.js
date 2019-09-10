import React, { useEffect, useState } from 'react';
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

  const [localLoading, setLocalLoading] = useState(false);
  const [searchPosts, setSearchPosts] = useState();

  useEffect(() => {
    if (!array[0] && !noData) populateResourcesAction()
  }, [])

  const handleSearchResults = ({ data }) => {
    if (data) setSearchPosts(data);
    setLocalLoading(false);
  }

  return (
    <div className="dashboard-container">
      <Title>Publicaciones</Title>
      <ContainerItem style={{ position: 'relative' }} >
        { fetching || localLoading ? <Spinner /> : null }
        <ResourcesTable
          onSearch={() => setLocalLoading(true)}
          onSearchResults={handleSearchResults}
          data={searchPosts || publications}
          emptyText="No hay publicaciones disponibles"
          resourceType="Publicaciones"
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
