import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { Link } from 'react-router-dom';

import { Typography } from 'antd';

function EventItem({ time, title, level1, level2, baseTo, id, state }) {
  const { Title, Text } = Typography;

  return (
    <div className="event-item">
      <div className="event-item-day">{ time }</div>
      <div className="event-item-info">
        <Link to={{ pathname: `${baseTo}${id}`, state }}>
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
  baseTo: PropTypes.string,
};

EventItem.defaultProps = {
  event: {
    program: [{}],
  },
  baseTo: '/dashboard/events/',
};
