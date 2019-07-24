import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function ProfilePhoto({ photoURL, className }) {
  return (
    <div className={className}>
      {
        photoURL === 'none' ? (
          <div className="profile-photo-none">
            <FontAwesomeIcon icon={faUser} />
          </div>
        ) : (
          <div className="profile-photo-pic" style={{ backgroundImage: `url(${photoURL})` }} />
        )
      }
    </div>
  );
}

export default ProfilePhoto;

ProfilePhoto.propTypes = {
  photoURL: PropTypes.string,
  className: PropTypes.string,
};

ProfilePhoto.defaultProps = {
  photoURL: 'none',
  className: 'profile-photo',
};
