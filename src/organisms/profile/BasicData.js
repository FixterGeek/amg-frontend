import React from 'react';

import { Typography, Button } from 'antd';

import DashboardContainerItem from '../../atoms/DashboardContainerItem';
import ProfilePhoto from '../../atoms/ProfilePhoto';

function BasicData({
  photoURL, membershipStatus, speciality, place
}) {
  const { Title, Text } = Typography;

  return (
    <DashboardContainerItem className="basic-data">
      <div className="basic-data-photo">
        <Button
          type="primary"
          className="edit"
          shape="round"
          icon="edit" />
        <ProfilePhoto photoURL={photoURL} />
      </div>
      <div className="basic-data-info">
        <Title level={3}>{ membershipStatus }</Title>
        <Text>{ speciality }</Text>
        <Text>{ place }</Text>
        <div className="basic-data-folow">
          <div>
            <Text strong>Te siguen</Text>
            <div level={4}>102</div>
          </div>
          <div>
            <Text strong>Sigues</Text>
            <div>58</div>
          </div>
        </div>
      </div>
    </DashboardContainerItem>
  );
}

export default BasicData;
