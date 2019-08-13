import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Typography, Icon } from 'antd';

import { selfPublicationsAction } from '../../store/ducks/publicationsDuck';
import DashboardContainerItem from '../../atoms/DashboardContainerItem';
import ProfilePhoto from '../../atoms/ProfilePhoto';
import Tabs from './reusables/Tabs';
import PostItem from '../../molecules/PostItem';

function MainProfile({ selfPublications, selfPublicationsAction }) {
  const { Title, Text } = Typography;


  useEffect(() => {
    if (!selfPublications[0]) {
      selfPublicationsAction()
        .then(data => console.log(data))
        .catch(error => console.log(error));
    }
  }, []);

  console.log(selfPublications);

  return (
    <div className="dashboard-container component-main-profile">
      <Title>Perfil</Title>
      <DashboardContainerItem className="info">
        <Link to="/dashboard/perfil/editar">
          <Icon className="edit" type="edit" />
        </Link>
        <div>
          <ProfilePhoto />
        </div>
        <div>
          <Title level={4}>Nombre</Title>
          <Text>Socio</Text>
          <Text>Gastro</Text>
        </div>
        <div className="follows">
          <div>Followers</div>
          <div>Follows</div>
        </div>
      </DashboardContainerItem>

      <Tabs headers={['Mis Pagos', 'Mis constancias']} />

      <DashboardContainerItem>
        <div>
          <Text>Mis publicaciones</Text>
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
  return { selfPublications: state.publications.selfArray };
}

export default connect(mapStateToProps, { selfPublicationsAction })(MainProfile);
