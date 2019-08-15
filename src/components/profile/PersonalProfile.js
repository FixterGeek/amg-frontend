import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { updateUserAction } from '../../store/ducks/userDuck';
import { populateActivitiesAction } from '../../store/ducks/activitiesDuck';
import Spinner from '../../atoms/Spinner';
import BasicData from './editables/BasicData';
import PersonalBio from './editables/PersonalBio';
import PersonalEducation from './editables/PersonalEducation';
import LaboralExperience from './editables/LaboralExperience';
import ContainerItem from '../../atoms/DashboardContainerItem';
import BoxItem from '../../atoms/BoxItem';

function PersonalProfile({ user, activities, updateUserAction, populateActivitiesAction }) {
  const {
    basicData, membershipStatus, studies, hospitalActivities,
    photo,
  } = user;
  const { photoURL, speciality } = basicData;

  useEffect(() => {
    populateActivitiesAction();
  }, []);

  console.log(activities)
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
      <ContainerItem>
        {
          activities.map(activity => (
            <BoxItem
              title={activity.charge || activity.subject}
              level2={
                `${moment(activity.startDate).format('YYY')} - ${moment(activity.endDate).format('YYYY')}`
            } />
          ))
        }
      </ContainerItem>
    </div>
  );
}

function mapStateToProps({ user, activities }) {
  return {
    user,
    activities: activities.activitiesArray,
  };
}

export default connect(
  mapStateToProps, { updateUserAction, populateActivitiesAction },
)(PersonalProfile);
