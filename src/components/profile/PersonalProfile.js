import React, { useState } from 'react';
import { connect } from 'react-redux';

import { updateUserAction } from '../../store/ducks/userDuck';
import Spinner from '../../atoms/Spinner';
import BasicData from './editables/BasicData';
import PersonalBio from './editables/PersonalBio';
import PersonalEducation from './editables/PersonalEducation';
import LaboralExperience from './editables/LaboralExperience';

function PersonalProfile({ user, updateUserAction }) {
  const {
    basicData, membershipStatus, studies, hospitalActivities,
    photo,
  } = user;
  const { photoURL, speciality } = basicData;


  return (
    <div className="dashboard-container component-main-profile">
      { user.fetching && <Spinner /> }
      <BasicData
        photoFile={photo}
        dispatch={updateUserAction}
        photoURL={photoURL}
        user={user}
        membershipStatus={membershipStatus}
        speciality={speciality} />

      <PersonalBio dispatch={updateUserAction} />

      <PersonalEducation />

      <LaboralExperience />
    </div>
  );
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps, { updateUserAction })(PersonalProfile);
