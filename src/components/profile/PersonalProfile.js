import React from 'react';
import { connect } from 'react-redux';

import { Typography } from 'antd';

import DashboardContainerItem from '../../atoms/DashboardContainerItem';
import BasicData from '../../organisms/profile/BasicData';
import PersonalBio from '../../organisms/profile/PersonalBio';
import PersonalEducation from '../../organisms/profile/PersonalEducation'

function PersonalProfile({ user }) {
  const { Title, Text } = Typography;
  const {
    basicData, membershipStatus, studies, hospitalActivities,
  } = user;
  const { photoURL, speciality, address } = basicData;

  console.log(address);

  return (
    <div className="dashboard-container">
      <Title>{`${basicData.name} ${basicData.dadSurname} ${basicData.momSurname}`}</Title>
      <BasicData
        photoURL={photoURL}
        membershipStatus={membershipStatus}
        speciality={speciality}
        place={address.addressName} />

      <PersonalBio />

      <PersonalEducation />
    </div>
  );
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(PersonalProfile);
