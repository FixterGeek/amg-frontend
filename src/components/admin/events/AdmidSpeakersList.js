import React from 'react';
import Proptypes from 'prop-types';

import BoxItem from '../../reusables/BoxItem';

function AdminSpeakerList({ speakers }) {
  const defaultPhoto = 'https://firebasestorage.googleapis.com/v0/b/amgweb.appspot.com/o/reusables%2Fprofile_9.png?alt=media&token=be192ce4-34cd-440d-a898-632d13acb44a';

  return (
    <div>
      {
        speakers.map(speaker => {
          return (
            <div>
              <BoxItem
                title={speaker.fullName}
                subtitle={speaker.title}
                footer={speaker.city}
                leftIsImage
                imageUrl={speaker.photoURL || defaultPhoto}
              />
            </div>
          )
        })
      }
    </div>
  );
}

export default AdminSpeakerList;

AdminSpeakerList.propTypes = {
  speakers: Proptypes.array,
};

AdminSpeakerList.defaultProps = {
  speakers: [],
};
