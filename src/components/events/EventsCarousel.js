import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import BaseCarousel from '../reusables/BaseCarousel';
import EventCover from './reusables/EventCover';

function EventsCarousel({ events }) {
  const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/amgweb.appspot.com/o/reusables%2Fdefault-event.jpg?alt=media&token=b85dcbf5-7603-4050-a33b-383bc1e619ab'

  const [covers, setCovers] = useState([]);

  useEffect(() => {
    let coversArray = [];

    events.map((event) => {
      coversArray = [
        ...coversArray,
        <EventCover
          imageUrl={event.mainImagesURLS[0] || defaultImage}
          linkeable
          to={`/dashboard/events/${event._id}`}
          eventObject={event}
        />
      ]
    });

    setCovers(coversArray);
  }, [events])

  return (
    <BaseCarousel itemsArray={covers} />
  );
}

export default EventsCarousel;

EventsCarousel.propTypes = {
  events: PropTypes.array,
};

EventCover.defaultProps = {
  events: [],
};
