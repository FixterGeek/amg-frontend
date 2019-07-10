import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShareAlt } from '@fortawesome/free-solid-svg-icons';

function PostIcons() {
  return (
    <div className="post-icons">
      <FontAwesomeIcon icon={faHeart} />
      <FontAwesomeIcon icon={faShareAlt} />
    </div>
  );
}

export default PostIcons;
