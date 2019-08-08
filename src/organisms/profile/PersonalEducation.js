import React from 'react';
import { connect } from 'react-redux';

import { Typography } from 'antd';

import DashboardContainerItem from '../../atoms/DashboardContainerItem';
import Button from '../../atoms/Button';
import ModalEducation from '../modals/ModalEducation';

function PersonalEducation({ user }) {
  const { Title } = Typography;

  return (
    <DashboardContainerItem>
      <DashboardContainerItem className="personal-title">
        <Title>Educación</Title>
        <ModalEducation />
      </DashboardContainerItem>
    </DashboardContainerItem>
  );
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(PersonalEducation);
