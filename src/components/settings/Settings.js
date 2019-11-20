import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Typography } from 'antd';

import { populateSubsidiaries } from '../../store/ducks/subsidiaryDuck';
import ContainerItem from '../reusables/ContainerItem';
import SettingsMembership from './SettingsMembership';

function Settings({
  user, subsidiaries, noSubsidiaries,
  populateSubsidiaries,
}) {
  const { Title } = Typography;

  useEffect(() => {
    if (!subsidiaries[0] && !noSubsidiaries) populateSubsidiaries();
  }, [subsidiaries.length]);

  return (
    <div className="dashboard-container">
      <ContainerItem>
        <Title>Ajustes de la cuenta</Title>
      </ContainerItem>
      <ContainerItem>
        <Title level={3}>Membresía</Title>
      </ContainerItem>
      {
        user.userStatus === 'Aprobado'
          ? (
            <SettingsMembership
              membershipStatus={user.membershipStatus}
              userStatus={user.userStatus}
              selectables={user.selectables || null}
              userIsInFilial={user.filialAsUser}
              filial={subsidiaries.filter(f => f._id === user.filialAsUser)[0]}
            />
          ) : '¡Tu cuenta aún no ha sido aprobada!'
      }
    </div>
  );
}

function mapStateToProps({ user, subsidiary }) {
  return {
    user,
    subsidiaries: subsidiary.array,
    noSubsidiaries: subsidiary.noData,
  };
}

export default connect(
  mapStateToProps, {
    populateSubsidiaries,
  }
)(Settings);
