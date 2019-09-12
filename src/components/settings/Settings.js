import React from 'react';
import { connect } from 'react-redux';

import { Typography } from 'antd';

import ContainerItem from '../reusables/ContainerItem';
import MembershipCards from '../../organisms/membership/MembershipCards';
import SettingsMembership from './SettingsMembership';

function Settings({ user }) {
  const { Title } = Typography;

  return (
    <div className="dashboard-container">
      <ContainerItem>
        <Title>Ajustes de la cuenta</Title>
      </ContainerItem>
      <ContainerItem>
        <Title level={3}>Membresía</Title>
      </ContainerItem>
        <SettingsMembership
          membershipStatus={user.membershipStatus}
          userStatus={user.userStatus}
        />
      {
        user.userStatus === 'Aprobado'
          ? <MembershipCards user={user} /> : '¡Tu cuenta aún no ha sido aprobada!'
      }
    </div>
  );
}

function mapStateToProps({ user }) {
  return {
    user
  };
}

export default connect(mapStateToProps)(Settings);
