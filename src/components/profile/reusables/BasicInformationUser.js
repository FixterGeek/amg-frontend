import React from 'react'
import { Link } from 'react-router-dom';

import { Typography, Icon } from 'antd'

import DashboardContainerItem from '../../../atoms/DashboardContainerItem';
import ProfilePhoto from '../../../atoms/ProfilePhoto';

function BasicInformationUser({ editableLink, user, nonOwn }) {
  const { Title, Text } = Typography

  const { basicData = {}, followers, following, membershipStatus } = user;
  const { photoURL, name, dadSurname, momSurname, speciality } = basicData;


  return (
    <DashboardContainerItem className="info">
      {
        editableLink && (
          <Link to="/dashboard/perfil/editar">
            <Icon className="edit" type="edit" />
          </Link>
        )
      }
      <div>
        <ProfilePhoto photoURL={photoURL} />
      </div>
      <Title level={4}>{`${name} ${dadSurname} ${momSurname}`}</Title>
      <Text>{ membershipStatus }</Text>
      <Text>{ speciality }</Text>

      {
        !nonOwn && (
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
        )
      }
    </DashboardContainerItem>
  );
}

export default BasicInformationUser;
