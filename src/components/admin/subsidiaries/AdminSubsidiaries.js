import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Typography } from 'antd';

import {
  populateSubsidiaries,
} from '../../../store/ducks/subsidiaryDuck';
import ContainerItem from '../../reusables/ContainerItem';
import StatsContainer from '../reusables/StatsContainer';
import SubsidiariesList from './AdminSibsidiariesList';
import SubsidiaryForm from './AdminSubsidiaryForm';
import Spinner from '../../reusables/Spinner';

function AdminSubsidiaries({
  subsidiaries, noSubsidiaries, fetching,
  populateSubsidiaries,
}) {
  const { Title } = Typography;

  useEffect(() => {
    if (!subsidiaries[0] && !noSubsidiaries) populateSubsidiaries();
  }, []);

  return (
    <section className="admin-subsidiaries">
      { fetching && <Spinner fullScrren /> }
      <ContainerItem>
        <Title>Filiales</Title>
      </ContainerItem>
      <ContainerItem className="admin-subsidiaries-stats-container">
        <StatsContainer title="Progreso" stats="65%" />
        <StatsContainer title="Total de facturas emitidas" stats="0" />
      </ContainerItem>
      <ContainerItem>
          <SubsidiaryForm isModal />
      </ContainerItem>
      <ContainerItem>
        <SubsidiariesList subsidiaries={subsidiaries} />
      </ContainerItem>
    </section>
  );
}

function mapStateToProps({ subsidiary }) {
  return {
    subsidiaries: subsidiary.array,
    noSubsidiaries: subsidiary.noData,
    fetching: subsidiary.fetching,
  };
}

export default connect(
  mapStateToProps, {
    populateSubsidiaries,
  }
)(AdminSubsidiaries);
