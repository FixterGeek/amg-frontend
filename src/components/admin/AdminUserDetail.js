import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { Typography, Tabs } from 'antd';

import { populateEducationAction } from '../../store/ducks/educationDuck';
import { populateActivitiesAction } from '../../store/ducks/activitiesDuck';
import { getAllUsers } from '../../store/ducks/users';
import useSweet from '../../hooks/useSweetAlert';
import ContainerItem from '../reusables/ContainerItem';
import Spinner from '../reusables/Spinner';
import UserGeneralDataForm from '../signup/forms/SignupGeneralDataForm';
import UserStatusForm from './users/AdminUserStatesForm';
import AdminUsersRecidences from './users/AdminUserResidences';
import BoxItem from '../reusables/BoxItem';

function AdminUserDetail({
  user, status, fetching,
  getAllUsers, curentUser,
  studies, residencies,
  internships, activities,
  populateActivitiesAction,
  populateEducationAction,
}) {
  const { infoAlert } = useSweet();
  const { Title } = Typography;
  const { TabPane } = Tabs;

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (user._id) {
      console.log(user._id);
      populateEducationAction(user._id);
      populateActivitiesAction(user._id);
    }
  }, [user._id])

  useEffect(() => {
    if (!user._id && status === 'success') infoAlert({ text: 'Los datos del usuario no estan disponibles' });
  }, [user])

  console.log(studies, residencies, internships, activities);

  return (
    <section>
      { fetching && <Spinner fullScrren /> }
      <ContainerItem className="dash-item-center">
        <ContainerItem>
          <Title>{ `${user.basicData.name || ''} ${user.basicData.dadSurname || ''}` }</Title>
        </ContainerItem>
        <ContainerItem>
          <Tabs>
            <TabPane key="1" tab="Datos generales">
              <UserGeneralDataForm user={user} hiddenButton noPassword />
            </TabPane>
            <TabPane key="2" tab="Estados">
              <UserStatusForm userId={user._id} />
            </TabPane>
            <TabPane key="3" tab="Residencia" disabled={curentUser.filialAsAdmin}>
              <AdminUsersRecidences userId={user._id} />
            </TabPane>
            <TabPane key="4" tab="Estudios" disabled={curentUser.filialAsAdmin}>
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
            </TabPane>
            <TabPane key="5" tab="Internados" disabled={curentUser.filialAsAdmin}>
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
            </TabPane>
            <TabPane key="6" tab="Actividades" disabled={curentUser.filialAsAdmin}>
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
            </TabPane>
          </Tabs>
        </ContainerItem>
      </ContainerItem>
    </section>
  );
}

function mapStateToProps({ users, user, activities, education }, { match }) {
  const { params = {} } = match;
  // console.log(users);
  return {
    user: users.array.filter(u => u._id === params.userId)[0] || { basicData: {} },
    curentUser: user,
    status: users.status,
    fetching: users.fetching,
    studies: education.studies,
    internships: education.internships,
    residencies: education.residencies,
    activities: activities.activitiesArray,
  };
}

export default connect(
  mapStateToProps, {
    getAllUsers,
    populateEducationAction,
    populateActivitiesAction,
  }
)(AdminUserDetail);
