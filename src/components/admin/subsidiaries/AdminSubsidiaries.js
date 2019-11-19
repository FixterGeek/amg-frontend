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
  populateSubsidiaries, history, userIsAdmin,
}) {
  const { Title } = Typography;

  useEffect(() => {
    if (!subsidiaries[0] && !noSubsidiaries) populateSubsidiaries();
    if (!userIsAdmin) history.push('/dashboard');
  }, []);

  return (
    <section className="admin-subsidiaries">
      { fetching && <Spinner fullScrren /> }
      <ContainerItem>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Title>Filiales</Title>
          <SubsidiaryForm isModal line={true} />
        </div>
      </ContainerItem>
      <ContainerItem className="admin-subsidiaries-stats-container">
        <StatsContainer title="Progreso" stats="65%" />
        <StatsContainer style={{ backgroundColor: '#fa6400' }} title="Total de facturas emitidas" stats="0" />
      </ContainerItem>
      <ContainerItem>
        <SubsidiariesList subsidiaries={subsidiaries} />
      </ContainerItem>
    </section>
  );
}

function mapStateToProps({ subsidiary, user }) {
  return {
    subsidiaries: subsidiary.array,
    noSubsidiaries: subsidiary.noData,
    fetching: subsidiary.fetching,
    userIsAdmin: user.userType === 'Admin',
  };
}

export default connect(
  mapStateToProps, {
    populateSubsidiaries,
  }
)(AdminSubsidiaries);
