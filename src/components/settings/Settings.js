import React from 'react';
import { connect } from 'react-redux';

import { Typography } from 'antd';

import DashboardContainerItem from '../../atoms/DashboardContainerItem';
import MembershipCards from '../../organisms/membership/MembershipCards';

function Settings({ user }) {
  const { Title } = Typography;

  return (
    <div className="dashboard-container">
      <DashboardContainerItem>
        <Title>Ajustes de la cuenta</Title>
      </DashboardContainerItem>
      <DashboardContainerItem>
        <Title level={3}>Membresia</Title>
      </DashboardContainerItem>
      {
        user.userSatus === 'Aprobado'
          ? <MembershipCards user={user} /> : 'Tu cuenta aun no a sido aprobada!'
      }
    </div>
  );
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(Settings);
