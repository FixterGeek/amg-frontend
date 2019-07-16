import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function ProfilePhoto({ photoURL }) {
  return (
    <div className="profile-photo">
      {
        photoURL === 'none' ? (
          <div className="profile-photo-none">
            <FontAwesomeIcon icon={faUser} />
          </div>
        ) : (
          <img src={photoURL} alt="AMG" />
        )
      }
    </div>
  );
}

export default ProfilePhoto;

ProfilePhoto.propTypes = {
  photoURL: PropTypes.string,
};

ProfilePhoto.defaultProps = {
  photoURL: 'none',
};
