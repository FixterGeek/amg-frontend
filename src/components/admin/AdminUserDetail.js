import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Typography, Tabs } from 'antd';

import { getAllUsers } from '../../store/ducks/users';
import useSweet from '../../hooks/useSweetAlert';
import ContainerItem from '../reusables/ContainerItem';
import Spinner from '../reusables/Spinner';
import UserGeneralDataForm from '../signup/forms/SignupGeneralDataForm';
import UserStatusForm from './users/AdminUserStatesForm';
import AdminUsersRecidences from './users/AdminUserResidences';

function AdminUserDetail({
  user, status, fetching,
  getAllUsers,
}) {
  const { infoAlert } = useSweet();
  const { Title } = Typography;
  const { TabPane } = Tabs;

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (!user._id && status === 'success') infoAlert({ text: 'Los datos del usuario no estan disponibles' });
  }, [user])

  console.log(user);

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
            <TabPane key="3" tab="Residencia">
              <AdminUsersRecidences userId={user._id} />
            </TabPane>
          </Tabs>
        </ContainerItem>
      </ContainerItem>
    </section>
  );
}

function mapStateToProps({ users }, { match }) {
  const { params = {} } = match;
  console.log(users);
  return {
    user: users.array.filter(u => u._id === params.userId)[0] || { basicData: {} },
    status: users.status,
    fetching: users.fetching,
  };
}

export default connect(
  mapStateToProps, {
    getAllUsers,
  }
)(AdminUserDetail);
