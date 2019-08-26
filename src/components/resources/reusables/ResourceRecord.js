import React from 'react';

import { Typography } from 'antd';

function ResourceRecord({
  preview, title, subtitle, footer, url
}) {
  const { Title, Text } = Typography;
  const baseClassName = 'reusables-component-resources-resource-records'

  return (
    <a href={url} target="_blank" className={`${baseClassName}`}>
      <div className={`${baseClassName}-preview`}>
        <img src={preview} alt={title} />
      </div>
      <div className={`${baseClassName}-info`}>
        <Title level={4}>{ title }</Title>
        <Text>{ subtitle }</Text>
        <Text>{ footer }</Text>
      </div>
    </a>
  );
}

export default ResourceRecord;
