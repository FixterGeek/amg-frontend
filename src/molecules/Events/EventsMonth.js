import React from 'react';
import moment from 'moment';

import { Typography } from 'antd';

import EventItem from '../../atoms/EventItem';

function EventsMonth({ month, events }) {
  const { Title } = Typography;
  const months = [
    'Enero', 'Febrero', 'Marzo',
    'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre',
    'Octubre', 'Noviembre', 'Diciembre',
  ];

  if (events.length > 0) {
    return (
      <div className="events-month">
        <div>
          <Title level={3}>{ months[month] }</Title>
        </div>
        <div>
          {
            events.map((event) => {
              console.log(event);
              return (
                <EventItem
                  key={event._id}
                  time={moment(event.startDate).format('DD')}
                  title={event.title}
                  to={`/dashboard/events/${event._id}`}
                  state={event} />
              );
            })
          }
        </div>
      </div>
    );
  }

  return null;
}

export default EventsMonth;
