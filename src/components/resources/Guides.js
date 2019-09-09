import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Typography } from 'antd';

import { populateResourcesAction } from '../../store/ducks/resourceDuck';
import useSweet from '../../hooks/useSweetAlert';
import ContainerItem from '../../atoms/DashboardContainerItem';
import ResourcesTable from './reusables/ResourcesTable'
import Spinner from '../reusables/Spinner';

function Guides({
  guides, array, populateResourcesAction,
  fetching, status, noData,
}) {
  const { Title } = Typography;
  const { errorAlert } = useSweet();


  const [searchGuides, setSearchGuides] = useState();
  const [localLoading, setLocalLoading] = useState(false)


  useEffect(() => {
    if (status === 'error') errorAlert({});
  }, [status])

  useEffect(() => {
    if (!array[0] && !noData) populateResourcesAction();
  }, [])

  const handleSearchResults = ({ data }) => {
    if (data) setSearchGuides(data);
    setLocalLoading(false);
  };

  return (
    <div className="dashboard-container">
      <Title>Guías y consensos</Title>
      <ContainerItem style={{ position: 'relative' }}>
        { fetching || localLoading ? <Spinner /> : null }
        <ResourcesTable
          onSearchResults={handleSearchResults}
          onSearch={() => setLocalLoading(true)}
          data={searchGuides || guides}
          resourceType="Guías y consensos"
        />
      </ContainerItem>
    </div>
  )
}

function mapSateToProps({ resources }) {
  return {
    guides: resources.guides,
    array: resources.array,
    fetching: resources.fetching,
    status: resources.status,
    noData: resources.noData,
  }
}

export default connect(
  mapSateToProps, {
    populateResourcesAction,
  }
)(Guides);
