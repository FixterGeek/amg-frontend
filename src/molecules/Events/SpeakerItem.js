import React from 'react';
import { Link } from 'react-router-dom';

import { Typography } from 'antd';

import ProfilePhoto from '../../atoms/ProfilePhoto';

function SpeakerItem({ photoURL, title, level1, level2, to, state }) {
  const { Title, Text } = Typography;

  return (
    <div className="speaker-item">
      <div className="speaker-item-photo">
        <ProfilePhoto photoURL={photoURL} />
      </div>
      <div className="speaker-item-info">
        <Link to={{ pathname: `${to}`, state }}>
          <div>
            <Title level={4}>{ title }</Title>
          </div>
          <div>
            <Text>
              { level1 }
            </Text>
          </div>
          <div>
            <Text>
              { level2 }
            </Text>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default SpeakerItem;
