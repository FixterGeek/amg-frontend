import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from 'antd';

function BoxItem({ title, level1, level2 }) {
  const { Title, Text } = Typography;
  return (
    <div className="event-item">
      <div className="event-item-info">
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
      </div>
    </div>
  );
}

export default BoxItem;

BoxItem.propTypes = {
  title: PropTypes.string,
  level1: PropTypes.string,
  level2: PropTypes.string,
};

BoxItem.defaultProps = {
  title: 'Title',
  level1: 'Text 1',
  level2: 'Text 2',
};
