import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Typography } from 'antd';

function EventItem({ time, title, level1, level2, to, state, className ,hour2}) {
  const { Title, Text } = Typography;

  return (
    <div className="event-item">
      <div className="event-item-day">{ time } - { hour2 }</div>      
      <div className={`event-item-info ${className}`}>
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

export default EventItem;

EventItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  event: PropTypes.object,
  to: PropTypes.string,
};

EventItem.defaultProps = {
  event: {
    program: [{}],
  },
  to: '/dashboard/events/',
};
