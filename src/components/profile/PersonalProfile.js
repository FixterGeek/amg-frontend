import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { Typography } from 'antd';

import { updateUserAction } from '../../store/ducks/userDuck';
import { populateActivitiesAction } from '../../store/ducks/activitiesDuck';
import { populateEducationAction } from '../../store/ducks/educationDuck';
import Spinner from '../../atoms/Spinner';
import BasicData from './editables/BasicData';
import PersonalBio from './editables/PersonalBio';
import PersonalEducation from './editables/PersonalEducation';
import LaboralExperience from './editables/LaboralExperience';
import ContainerItem from '../../atoms/DashboardContainerItem';
import BoxItem from '../../atoms/BoxItem';

function PersonalProfile({
  user, activities, updateUserAction, populateActivitiesAction,
  activitiesFetching, studies, internships, residences, populateEducationAction
}) {
  const { Title } = Typography;

  const {
    basicData, membershipStatus, photo,
  } = user;
  const { photoURL, speciality } = basicData;


  useEffect(() => {
    if (!activities[0]) populateActivitiesAction();
    populateEducationAction();
  }, []);


  return (
    <div className="dashboard-container component-main-profile relative">
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

      <ContainerItem className="relative">
        <ContainerItem>
          <Title level={3}>Estudios</Title>
        </ContainerItem>
        {
          studies.map(study => (
            <BoxItem
              title={study.major || study.institution.name}
              level1={study.institution.name}
              level2={
                `${moment(study.startDate).format('YYY')} - ${moment(study.endDate).format('YYYY')}`
            } />
          ))
        }

        <ContainerItem>
          <Title level={3}>Internados</Title>
        </ContainerItem>
        {
          internships.map(internship => (
            <BoxItem
              title={internship.institution.name}
              level1={internship.institution.name}
              level2={
                `${moment(internship.startDate).format('YYY')} - ${moment(internship.endDate).format('YYYY')}`
            } />
          ))
        }

        <ContainerItem>
          <Title level={3}>Residencias</Title>
        </ContainerItem>
        {
          residences.map(residence => (
            <BoxItem
              title={residence.speciality || residence.institution.name}
              level1={residence.institution.name}
              level2={
                `${moment(residence.startDate).format('YYY')} - ${moment(residence.endDate).format('YYYY')}`
            } />
          ))
        }
      </ContainerItem>

      <LaboralExperience />

      <ContainerItem className="relative">
        { activitiesFetching && <Spinner tip="Cargando experiencia laboral..." /> }
        {
          activities.map(activity => (
            <BoxItem
              title={activity.charge || activity.subject || activity.institution.name}
              level1={activity.institution.name}
              level2={
                `${moment(activity.startDate).format('YYY')} - ${moment(activity.endDate).format('YYYY')}`
            } />
          ))
        }
      </ContainerItem>
    </div>
  );
}

function mapStateToProps({ user, activities, education }) {
  return {
    user,
    studies: education.studies,
    internships: education.internships,
    residences: education.residences,
    activities: activities.activitiesArray,
    activitiesFetching: activities.fetching,
  };
}

export default connect(
  mapStateToProps, {
    updateUserAction,
    populateActivitiesAction,
    populateEducationAction,
  },
)(PersonalProfile);
