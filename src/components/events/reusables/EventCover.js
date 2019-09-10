import React from 'react';
import { Link } from 'react-router-dom';

import { eventStringDate } from '../../../tools/stringDate';

function EventCover({ imageUrl, linkeable, to, eventObject }) {
  const { title = 'Gastro', location = {}, startDate = null, endDate = null } = eventObject;
  const { city = 'Lugar no definido', state = null } = location;

  const LinkDelivery = () => {
    if (linkeable) return (
      <Link
        to={{
          pathname: to,
          state: eventObject,
        }}
      >
        <img src={imageUrl} />
      </Link>
    )

    return (
      <img src={imageUrl} />
    )
  }

  return (
    <div className="events-reusables-event-cover">
      <LinkDelivery />
      <div className="events-reusables-event-cover-info">
        <span className="title">{ title }</span>
        {
          city || state ? (
            <span className="place">{`${city}, ${state}`}</span>
          ) : null
        }
        { startDate &&  <span className="date">{ eventStringDate(startDate, endDate) }</span> }
      </div>
    </div>
  );
}

export default EventCover;
