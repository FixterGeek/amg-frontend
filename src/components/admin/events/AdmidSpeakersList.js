import React from 'react';
import Proptypes from 'prop-types';

import BoxItem from '../../reusables/BoxItem';

function AdminSpeakerList({ speakers }) {
  const defaultPhoto = 'https://firebasestorage.googleapis.com/v0/b/amgweb.appspot.com/o/reusables%2FAsset%20190.png?alt=media&token=1b14df1f-251f-4c41-a33e-db500a75fb79';

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
