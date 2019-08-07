import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Typography, Icon } from 'antd';

import Spinner from '../../atoms/Spinner';
import ModalName from '../../organisms/profile/ModalName';
import BasicData from '../../organisms/profile/BasicData';
import PersonalBio from '../../organisms/profile/PersonalBio';
import PersonalEducation from '../../organisms/profile/PersonalEducation';

function PersonalProfile({ user, dispatch }) {
  const [loading, setLoading] = useState(false);
  const {
    basicData, membershipStatus, studies, hospitalActivities,
    photo,
  } = user;
  const { photoURL, speciality } = basicData;


  return (
    <div className="dashboard-container">
      { loading && <Spinner /> }

      <ModalName
        userId={user._id}
        basicData={basicData}
        setLoading={setLoading}
        dispatch={dispatch} />

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
