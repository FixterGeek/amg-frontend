import React from 'react';
import { Typography } from 'antd';

function ImageText({ title, location, date }) {
  const { city, state } = location;
  const { Title, Text } = Typography;

  return (
    <div className="image-text">
      <Title level={2}>{ title }</Title>
      <Text>{ `${city}, ${state}` }</Text>
      <Text>{ date }</Text>
    </div>
  );
}

export default ImageText;
