import React from 'react';
import { connect } from 'react-redux';

import { Typography } from 'antd';

import DashboardContainerItem from '../../atoms/DashboardContainerItem';
import BasicData from '../../organisms/profile/BasicData';
import PersonalBio from '../../organisms/profile/PersonalBio';
import PersonalEducation from '../../organisms/profile/PersonalEducation'

function PersonalProfile({ user, dispatch }) {
  const { Title, Text } = Typography;
  const {
    basicData, membershipStatus, studies, hospitalActivities,
    photo,
  } = user;
  const { photoURL, speciality, address } = basicData;

  console.log('profile');


  return (
    <div className="dashboard-container">
      <Title>{`${basicData.name} ${basicData.dadSurname} ${basicData.momSurname}`}</Title>
      <BasicData
        photoFile={photo}
        dispatch={dispatch}
        photoURL={photoURL}
        userId={user._id}
        membershipStatus={membershipStatus}
        speciality={speciality}
        basicData={basicData} />

      <PersonalBio dispatch={dispatch} />

      <PersonalEducation />
    </div>
  );
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(PersonalProfile);
