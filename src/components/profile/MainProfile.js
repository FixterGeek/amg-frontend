import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Typography } from 'antd';

import {
  selfPublicationsAction,
  deletePublication,
} from '../../store/ducks/publicationsDuck';
import {
  populateFollows,
} from '../../store/ducks/userDuck';
import ContainerItem from '../reusables/ContainerItem';
import Tabs from './reusables/Tabs';
import PostItem from '../feed/reusables/PostItem';
import BasicInformationUser from './reusables/BasicInformationUser';
import PaymentsTable from './PaymentsTable';
import ConstanciesTable from './ConstanciesTable';
import Spinner from '../reusables/Spinner';

function MainProfile({
  user, selfPublications, selfPublicationsAction,
  deletePublication, fetching, populateFollows,
}) {
  const { Title, Text } = Typography;


  useEffect(() => {
      selfPublicationsAction();
      populateFollows();
  }, []);

  document.title = 'Perfil | Asociación Mexicana de Gastroenterología'

  return (
    <div className="dashboard-container component-main-profile ">
      { fetching && <Spinner fullScrren /> }
      <ContainerItem className="dash-item-center">
        <Title>Perfil</Title>
        <BasicInformationUser user={user} editableLink />

        <Tabs
          headers={['Mis Pagos', 'Mis constancias']}
          componentContent={[<PaymentsTable/>, <ConstanciesTable />]}
        />

        <ContainerItem>
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
        </ContainerItem>
      </ContainerItem>
    </div>
  );
}

function mapStateToProps({ publications, user }) {
  return {
    selfPublications: publications.selfArray,
    user,
    fetching: publications.fetching || user.fetching,
  };
}

export default connect(
  mapStateToProps, {
    selfPublicationsAction,
    deletePublication,
    populateFollows,
  })(MainProfile);
