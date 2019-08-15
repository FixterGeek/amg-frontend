import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Typography, Icon } from 'antd';

import { selfPublicationsAction } from '../../store/ducks/publicationsDuck';
import DashboardContainerItem from '../../atoms/DashboardContainerItem';
import ProfilePhoto from '../../atoms/ProfilePhoto';
import Tabs from './reusables/Tabs';
import PostItem from '../../molecules/PostItem';

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

  console.log(user);

  return (
    <div className="dashboard-container component-main-profile">
      <Title>Perfil</Title>
      <DashboardContainerItem className="info">
        <Link to="/dashboard/perfil/editar">
          <Icon className="edit" type="edit" />
        </Link>
        <div>
          <ProfilePhoto photoURL={photoURL} />
        </div>
        <Title level={4}>{`${name} ${dadSurname} ${momSurname}`}</Title>
        <Text>{ membershipStatus }</Text>
        <Text>{ speciality }</Text>

        <div className="follows">
          <div>
            Seguidores
            <span>{ followers.length }</span>
          </div>
          <div>
            Sigues
            <span>
              { following.length }
            </span>
          </div>
        </div>
      </DashboardContainerItem>

      <Tabs headers={['Mis Pagos', 'Mis constancias']} />

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
