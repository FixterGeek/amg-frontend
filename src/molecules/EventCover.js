/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';

import EventImage from '../atoms/EventImage';
import ImageText from '../atoms/ImageText';

function EventCover({
  title, location, startDate, endDate, image, size,
}) {
  const sDate = moment(startDate).locale('es');
  const eDate = moment(endDate).locale('es');

  let date = `del ${sDate.date()} de ${sDate.format('MMMM')} al ${eDate.date()} de ${eDate.format('MMMM')}`;

  if (sDate.month() === eDate.month()) date = `${sDate.date()}-${eDate.date()} de ${sDate.format('MMMM')}`;
  if (startDate === endDate) date = `${sDate.date()} de ${sDate.format('MMMM')}`;

  return (
    <div style={{ cursor: 'pointer' }}>
      <EventImage image={image} size={size}>
        <ImageText title={title} location={location} date={date} />
      </EventImage>
    </div>
  );
}

export default EventCover;

EventCover.propTypes = {
  title: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['normal', 'large']),
};

EventCover.defaultProps = {
  size: 'normal',
};
