import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Typography } from 'antd';

import { selfPublicationsAction } from '../../store/ducks/publicationsDuck';
import DashboardContainerItem from '../../atoms/DashboardContainerItem';
import Tabs from './reusables/Tabs';
import PostItem from '../feed/reusables/PostItem';
import BasicInformationUser from './reusables/BasicInformationUser';
import PaymentsTable from './PaymentsTable';

function MainProfile({ user, selfPublications, selfPublicationsAction }) {
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
    if (!selfPublications[0]) {
      selfPublicationsAction()
        .then(data => console.log(data))
        .catch(error => console.log(error));
    }
  }, []);


  return (
    <div className="dashboard-container component-main-profile">
      <Title>Perfil</Title>
      <BasicInformationUser user={user} editableLink />

      <Tabs
        headers={['Mis Pagos', 'Mis constancias']}
        componentContent={[<PaymentsTable/>]}
      />

      <DashboardContainerItem>
        <div>
          <Text strong>Mis publicaciones</Text>
        </div>
        <div>
          {
            selfPublications.map(post => (
              <PostItem publication={post} />
            ))
          }
        </div>
      </DashboardContainerItem>
    </div>
  );
}

function mapStateToProps(state) {
  return { selfPublications: state.publications.selfArray, user: state.user };
}

export default connect(mapStateToProps, { selfPublicationsAction })(MainProfile);
