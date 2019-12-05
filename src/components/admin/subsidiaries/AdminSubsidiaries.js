import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Typography, Spin, Icon } from 'antd';

import { getPayments } from '../../../services/paymentServices';
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

  const [loadingPayments, setLoadingPayments] = useState(false);

  const [stats, setStats] = useState({
    total: [],
    progress: 0,
  })

  useEffect(() => {
    if (!subsidiaries[0] && !noSubsidiaries) populateSubsidiaries();
    if (!userIsAdmin) history.push('/dashboard');
    setLoadingPayments(true);
    getPayments().then((data) => {
      const fp = data.filter(p => p.filial);
      const totalUsers = [];
      fp.map(p => {
        p.users.map(u => {
          totalUsers.push(u);
        })
      })

      setStats(s => ({
        ...s,
        total: fp,
        progress:
          (totalUsers.filter(u => u.userStatus === 'Aprobado' || u.membershipStatus !== 'Free').length/totalUsers.length)*100
      }));
      setLoadingPayments(false);
    })
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
        <StatsContainer title="Progreso" stats={`${stats.progress}%`} />
        <StatsContainer
          style={{ backgroundColor: '#fa6400' }}
          title="Total de comprobantes subidos por filiales"
          stats={
            !stats.total[0] && loadingPayments ?
              <Spin indicator={<Icon type="loading" />} />
            : stats.total.length
          }
        />
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
