import React from 'react';
import moment from 'moment';

import { Typography } from 'antd';

import EventItem from '../../atoms/events/EventItem';

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
              return (
                <EventItem
                  key={event._id}
                  time={moment(event.startDate).format('DD')}
                  hour2={moment(event.endDate).format('DD')}
                  title={event.title}
                  level1={event.location.addressName}
                  level2={moment(event.startDate).format('dddd DD [de] MMMM')}
                  to={`/dashboard/eventos/${event._id}`}
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
