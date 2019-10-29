import React from 'react';

import { Typography } from 'antd';

import ContainerItem from '../../reusables/ContainerItem';
import StatsContainer from '../reusables/StatsContainer';
import SubsidiariesList from './AdminSibsidiariesList';
import FormManager from '../reusables/CreateAndUpdateManager';
import SubsidiaryForm from './AdminSubsidiaryForm';

function AdminSubsidiaries() {
  const { Title } = Typography;

  return (
    <section className="admin-subsidiaries">
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
        <SubsidiariesList />
      </ContainerItem>
    </section>
  );
}

export default AdminSubsidiaries;
