import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Typography } from 'antd';

import {
  selfPublicationsAction,
  deletePublication,
} from '../../store/ducks/publicationsDuck';
import DashboardContainerItem from '../../atoms/DashboardContainerItem';
import Tabs from './reusables/Tabs';
import PostItem from '../feed/reusables/PostItem';
import BasicInformationUser from './reusables/BasicInformationUser';
import PaymentsTable from './PaymentsTable';
import ConstanciesTable from './ConstanciesTable';
import Spinner from '../reusables/Spinner';

function MainProfile({
  user, selfPublications, selfPublicationsAction,
  deletePublication, fetching,
}) {
  const { Title, Text } = Typography;

  const {
    basicData = {}, membershipStatus = '', followers = [],
    following = [],
  } = user;
  const {
    photoURL = '', name = '', dadSurname = '',
    momSurname = '', speciality = '',
  } = basicData;


  useEffect(() => {
      selfPublicationsAction()
        .then(data => console.log(data))
        .catch(error => console.log(error));
  }, []);

  document.title = 'Perfil | Asociación Mexicana de Gastroenterología'

  return (
    <div className="dashboard-container component-main-profile">
      { fetching && <Spinner fullScrren /> }
      <Title>Perfil</Title>
      <BasicInformationUser user={user} editableLink />

      <Tabs
        headers={['Mis Pagos', 'Mis constancias']}
        componentContent={[<PaymentsTable/>, <ConstanciesTable />]}
      />

      <DashboardContainerItem>
        <div>
          <Text strong>Mis publicaciones</Text>
        </div>
        <div>
          {
            selfPublications.map(post => (
              <PostItem
                key={post._id}
                publication={post}
                user={user._id}
                deleteDispatch={deletePublication}
              />
            ))
          }
        </div>
      </DashboardContainerItem>
    </div>
  );
}

function mapStateToProps({ publications, user }) {
  return {
    selfPublications: publications.selfArray,
    user,
    fetching: publications.fetching,
  };
}

export default connect(
  mapStateToProps, {
    selfPublicationsAction,
    deletePublication,
  })(MainProfile);
