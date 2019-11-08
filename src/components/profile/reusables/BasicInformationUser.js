import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Typography, Icon } from 'antd';

import ContainerItem from '../../reusables/ContainerItem';
import ProfilePhoto from '../../../atoms/ProfilePhoto';
import Button from '../../reusables/Button';

function BasicInformationUser({
  editableLink, user, nonOwn,
  followDispatch, follow, showBio
}) {
  const { Title, Text } = Typography;

  const { basicData = {}, followers, following, membershipStatus } = user;
  const { photoURL, name, dadSurname, momSurname, speciality } = basicData;


  return (
    <ContainerItem className="profile-reusables-basic-information-user">
      {
        editableLink && (
          <Link to="/dashboard/perfil/editar">
            <Icon className="edit" type="edit" />
          </Link>
        )
      }
      <div className="photo-container">
        <ProfilePhoto photoURL={photoURL} />
      </div>
      <Title level={4}>{`${name} ${dadSurname} ${momSurname}`}</Title>
      <Text className="info-item">{ membershipStatus }</Text>
      <Text className="info-item">{ speciality }</Text>

      {
        !nonOwn ? (
          <div className="follows">
            <div>
              Seguidores
              <span>{ followers && followers.length }</span>
            </div>
            <div>
              Sigues
              <span>
                { following && following.length }
              </span>
            </div>
          </div>
        ) : (
          <Button width="180px" onClick={() => followDispatch(user._id, !follow)}>
            { follow ? 'Dejar de seguir' : 'Seguir' }
          </Button>
        )
      }
      {
        showBio && (
          <div className="bio">
            { basicData.bio || null }
          </div>
        )
      }
    </ContainerItem>
  );
}

export default BasicInformationUser;

BasicInformationUser.propTypes = {
  follow: PropTypes.bool,
  showBio: PropTypes.bool,
};

BasicInformationUser.defaultProps = {
  follow: false,
  showBio: false,
};