import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { Link } from 'react-router-dom';

import { Typography } from 'antd';

function EventItem({ event, baseTo }) {
  const { Title, Text } = Typography;
  const { program, startDate } = event;
  const day = moment(startDate).date();

  console.log(program);
  return (
    <div className="event-item">
      <div className="event-item-day">{ `${day}`.length === 1 ? `0${day}` : day }</div>
      <div className="event-item-info">
        <Link to={`${baseTo}${event._id}`}>
          <div>
            <Title level={4}>{ event.title }</Title>
          </div>
          <div>
            <Text>
              { program[0] ? program[0].speaker.fullName : '' }
            </Text>
          </div>
          <div>
            <Text>
              { program[0] ? program[0].place : '' }
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
