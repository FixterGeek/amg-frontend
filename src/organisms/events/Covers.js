/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Typography } from 'antd';

import { rotateArray, rotateArrayRight } from '../../tools/rotateArray';
import EventCover from '../../molecules/EventCover';

function Covers({ events }) {
  const [state, setState] = useState({
    events: [],
    animate: 'on',
  });

  const { Title } = Typography;


  useEffect(() => {
    if (state.events.length === 0) {
      setState({ events });
    }
  }, [events]);


  const goLeft = () => {
    setState({ animate: 'on', events: rotateArray(state.events) });
  };


  const goRight = () => {
    setState({ animate: 'on', events: rotateArrayRight(state.events) });
  };

  return (
    <div className="events-covers-container">
      <div>
        <Title>Eventos</Title>
      </div>
      <div className="events-covers-carousel">
        <div
          onClick={() => goLeft()}
          role="button"
          tabIndex={0}
          className="carousel-button-left"
          style={state.events.length > 3 ? { display: 'flex' } : {}} />
        {
          state.events.slice(0, 3).map(event => (
            <Link
              key={event._id}
              to={{ pathname: `/dashboard/events/${event._id}`, event }}
              className={`event-carousel-${state.animate} carousel-item`}>
              <EventCover
                title={event.title}
                location={event.location}
                startDate={event.startDate}
                endDate={event.endDate}
                image={event.photoURL} />
            </Link>
          ))
        }
        <div
          onClick={() => goRight()}
          role="button"
          tabIndex={0}
          className="carousel-button-right"
          style={state.events.length > 3 ? { display: 'flex' } : {}} />
      </div>
    </div>
  );
}

export default Covers;

Covers.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
};
