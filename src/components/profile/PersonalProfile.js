import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { Typography } from 'antd';

import useSweet from '../../hooks/useSweetAlert';
import { updateUserAction, resetUserStatus } from '../../store/ducks/userDuck';
import { populateActivitiesAction, resetActivitiesStatus } from '../../store/ducks/activitiesDuck';
import { populateEducationAction, resetEducationStatus } from '../../store/ducks/educationDuck';
import Spinner from '../reusables/Spinner';
import BasicData from './editables/BasicData';
import PersonalBio from './editables/PersonalBio';
import PersonalEducation from './editables/PersonalEducation';
import LaboralExperience from './editables/LaboralExperience';
import ContainerItem from '../reusables/ContainerItem';
import BoxItem from '../reusables/BoxItem';

function PersonalProfile({
  user, activities, updateUserAction, populateActivitiesAction,
  studies, internships, residencies,
  populateEducationAction,
  /* For fetchings and ststus */
  studiesFetching, studiesStatus, userFetching,
  userStatus, activitiesFetching, activitiesStatus,
  /* For resets status */
  resetActivitiesStatus, resetEducationStatus, resetUserStatus,
}) {
  const { Title } = Typography;

  const { errorAlert } = useSweet();
  const { basicData = {}, membershipStatus = null, photo = null } = user;
  const { photoURL = 'https://firebasestorage.googleapis.com/v0/b/amgweb.appspot.com/o/reusables%2Fprofile_9.png?alt=media&token=be192ce4-34cd-440d-a898-632d13acb44a', speciality = null } = basicData;

  useEffect(() => {
    if (userStatus === 'error' || studiesStatus === 'error' || activitiesStatus === 'error') {
      errorAlert({ title: 'Error al actualizar.' });
      resetActivitiesStatus();
      resetUserStatus();
      resetEducationStatus();
    } 
    if (userStatus === 'success' || studiesStatus === 'success' || activitiesStatus === 'success') {
      resetActivitiesStatus();
      resetUserStatus();
      resetEducationStatus();
    }
  }, [userStatus, studiesStatus, activitiesStatus])

  useEffect(() => {
    if (!activities[0]) populateActivitiesAction();
    populateEducationAction();
  }, []);

  const handleSaveBio = bio => {
    updateUserAction({ ...user, basicData: { ...user.basicData, bio } });
  };


  return (
    <div className="dashboard-container component-main-profile relative">
      { userFetching && <Spinner fullScrren /> }
      <BasicData
        photoFile={photo}
        dispatch={updateUserAction}
        photoURL={photoURL || 'https://firebasestorage.googleapis.com/v0/b/amgweb.appspot.com/o/reusables%2Fprofile_9.png?alt=media&token=be192ce4-34cd-440d-a898-632d13acb44ax'}
        user={user}
        membershipStatus={membershipStatus}
        speciality={speciality} />

      <PersonalBio onSave={handleSaveBio} value={user.basicData.bio} />

      <PersonalEducation />

      <ContainerItem className="relative">
        { studiesFetching && <Spinner /> }
        <ContainerItem>
          <Title level={3}>Estudios</Title>
        </ContainerItem>
        {
          studies.map(study => (
            <BoxItem
              noLeft
              key={study._id}
              title={study.major || study.institution.name}
              subtitle={study.institution.name || ' '}
              footer={
                `${moment(study.startDate).format('MMMM[ de ]YYYY')}
                  -
                ${study.endDate === 'Actualidad' ? 'Actualidad' : moment(study.endDate).format('MMMM[ de ]YYYY')}`
              }
            />
          ))
        }

        <ContainerItem>
          <Title level={3}>Internados</Title>
        </ContainerItem>
        {
          internships.map(internship => (
            <BoxItem
              noLeft
              key={internship._id}
              title={internship.institution.name || 'Internado'}
              subtitle={internship.institution.name || 'Internado'}
              footer={
                `${moment(internship.startDate).format('MMMM[ de ]YYYY')}
                  -
                ${internship.endDate === 'Actualidad' ? 'Actualidad' : moment(internship.endDate).format('MMMM[ de ]YYYY')}`
              }
            />
          ))
        }

        <ContainerItem>
          <Title level={3}>Residencias</Title>
        </ContainerItem>
        {
          residencies.map(residence => (
            <BoxItem
              noLeft
              key={residence._id}
              title={residence.speciality || residence.institution.name}
              subtitle={residence.institution.name || ' '}
              footer={
                `${moment(residence.startDate).format('MMMM[ de ]YYYY')}
                  -
                ${residence.endDate === 'Actualidad' ? 'Actualidad' : moment(residence.endDate).format('MMMM[ de ]YYYY')}`
              }
            />
          ))
        }
      </ContainerItem>

      <LaboralExperience />

      <ContainerItem className="relative">
        { activitiesFetching && <Spinner /> }
        {
          activities.map(activity => (
            <BoxItem
              noLeft
              key={activity._id}
              title={activity.charge || activity.subject || activity.institution.name}
              subtitle={activity.institution.name || ' '}
              footer={
                `${moment(activity.startDate).format('MMMM[ de ]YYYY')}
                  -
                ${activity.endDate === 'Actualidad' ? 'Actualidad' : moment(activity.endDate).format('MMMM[ de ]YYYY')}`
              }
            />
          ))
        }
      </ContainerItem>
    </div>
  );
}

function mapStateToProps({ user, activities, education }) {
  return {
    user,
    userFetching: user.fetching,
    userStatus: user.status,
    studies: education.studies,
    internships: education.internships,
    residencies: education.residencies,
    activities: activities.activitiesArray,
    activitiesFetching: activities.fetching,
    activitiesStatus: activities.status,
    studiesFetching: education.fetching,
    studiesStatus: education.status,
  };
}

export default connect(
  mapStateToProps, {
    updateUserAction,
    populateActivitiesAction,
    populateEducationAction,
    resetActivitiesStatus,
    resetEducationStatus,
    resetUserStatus,
  },
)(PersonalProfile);
