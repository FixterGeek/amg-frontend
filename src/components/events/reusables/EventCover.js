import React from 'react';
import { Link } from 'react-router-dom';

import { eventStringDate } from '../../../tools/stringDate';

function EventCover({ imageUrl, linkeable, to, eventObject }) {
  const { title = 'Gastro', location = {}, startDate = null, endDate = null } = eventObject;
  const { city = 'Lugar no definido', state = null } = location;

  const LinkDelivery = ({ children }) => {
    if (linkeable) return (
      <Link
        to={{
          pathname: to,
          state: eventObject,
        }}
      >
        { children }
      </Link>
    );

    return children;
  }

  return (
    <div className="events-reusables-event-cover">
      <LinkDelivery>
        <div className="events-reusables-event-cover-image" style={{ backgroundImage: `url(${imageUrl})` }} />
        <div className="events-reusables-event-cover-info">
          <span className="title">{ title }</span>
          {
            city || state ? (
              <span className="place">{`${city}, ${state}`}</span>
            ) : null
          }
          { startDate &&  <span className="date">{ eventStringDate(startDate, endDate) }</span> }
        </div>
      </LinkDelivery>
    </div>
  );
}

export default EventCover;
