import React from 'react';

import EventImage from '../atoms/EventImage';
import ImageText from '../atoms/ImageText';

function EventCover({
  title, location, startDate, endDate, image,
}) {
  const dayDate = number => Number(number);

  const monthName = (number) => {
    const months = [
      'enero', 'febrero', 'marzo',
      'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre',
      'octubre', 'noviembre', 'diciembre',
    ];

    return months[Number(number)];
  };

  let date = `del ${dayDate(startDate.slice(0, 2))} de ${monthName(startDate.slice(3, 5))} al ${dayDate(endDate.slice(1, 2))} de ${monthName(endDate.slice(3, 5))}`;
  if (monthName(startDate.slice(3, 5)) === monthName(endDate.slice(3, 5))) {
    date = `${dayDate(startDate.slice(0, 2))}-${dayDate(endDate.slice(0, 2))} de ${monthName(startDate.slice(3, 5))}`;
  }
  if (startDate === endDate) date = `${dayDate(startDate.slice(0, 2))} de ${monthName(startDate.slice(3, 5))}`;

  return (
    <div style={{ cursor: 'pointer' }}>
      <EventImage image={image}>
        <ImageText title={title} location={location} date={date} />
      </EventImage>
    </div>
  );
}

export default EventCover;
