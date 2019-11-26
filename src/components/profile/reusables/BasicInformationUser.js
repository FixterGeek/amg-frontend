import React, { useState } from 'react';
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

  const [followText, setFollowText] = useState('Siguiendo')


  return (
    <ContainerItem className="profile-reusables-basic-information-user">
      {
        editableLink && (
          <Link
            to="/dashboard/perfil/editar"
            style={{ position: 'absolute', top: '-32px', right: 0 }}>
            <Button width="200px" line>
              Editar perfil <Icon type="edit" />
            </Button>
          </Link>
        )
      }
      <div className="photo-container">
        <ProfilePhoto photoURL={photoURL || 'https://firebasestorage.googleapis.com/v0/b/amgweb.appspot.com/o/reusables%2Fprofile_9.png?alt=media&token=be192ce4-34cd-440d-a898-632d13acb44a'} />
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
          <div
            style={{ display: 'inline-block', margin: '32px' }}
            onMouseOut={follow ? () => setFollowText('Siguiendo') : null}
            onMouseEnter={follow ? () => setFollowText('Dejar de seguir') : null}>
            <Button
              marginBottom="0"
              marginTop="0"
              className={follow && 'unfolow'}
              line={follow ? false : true}
              width="180px"
              onClick={() => followDispatch(user._id, !follow)}>
              { follow ? followText : 'Seguir' }
            </Button>
          </div>
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
