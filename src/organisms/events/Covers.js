import React from 'react';
import PropTypes from 'prop-types';

import { Typography } from 'antd';

import EventCover from '../../molecules/EventCover';

function Covers({ events }) {
  const { Title } = Typography;

  return (
    <div className="events-covers-container">
      <div>
        <Title>Eventos</Title>
      </div>
      <div className="events-covers-carousel">
        <div
          className="carousel-button-left"
          style={events.length > 3 ? { display: 'flex' } : {}} />
        {
          events.map(event => (
            <EventCover
              key={event._id}
              title={event.title}
              location={event.location}
              startDate={event.startDate}
              endDate={event.endDate}
              image={event.photoURL} />
          ))
        }
        <div
          className="carousel-button-right"
          style={events.length > 3 ? { display: 'flex' } : {}} />
      </div>
    </div>
  );
}

export default Covers;

Covers.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
};
