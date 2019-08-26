import React from 'react';
import { Link } from 'react-router-dom';

import { Typography } from 'antd';

function ResourcesItem({ title, preview, to }) {
  const { Text } = Typography;
  return (
    <div className="reusables-component-resource-item">
      <Link to={to}>
        <Text>{ title }</Text>
        <div className="reusables-component-resource-item-preview">
          <img src={preview} alt={title} />
        </div>
      </Link>
    </div>
  );
}

export default ResourcesItem;
