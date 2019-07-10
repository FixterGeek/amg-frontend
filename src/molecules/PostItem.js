import React from 'react';

import { Typography } from 'antd';

import ProfilePhoto from '../atoms/ProfilePhoto';
import PostIcons from '../atoms/PostIcons';


function PostItem() {
  const { Title, Text } = Typography;

  return (
    <div className="post-item">
      <div className="post-item-info">
        <div className="post-item-photo">
          <ProfilePhoto />
        </div>
        <div>
          <div>
            <Title level={2}>Benito</Title>
          </div>
          <Text>Hoy a las 5:00 pm</Text>
        </div>
      </div>
      <div className="post-item-post">
        <Text>
          Officia eiusmod cupidatat eu ea nisi ipsum. Reprehenderit Lorem velit
          exercitation incididunt aliqua voluptate mollit minim Lorem dolor. Dolor
          occaecat qui qui proident reprehenderit sit aliquip ipsum officia nulla id.
        </Text>
      </div>
      <PostIcons />
    </div>
  );
}

export default PostItem;
