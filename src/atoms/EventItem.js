import React from 'react';
import { Link } from 'react-router-dom';

import { Typography } from 'antd';

function EventItem({ event }) {
  const { Title, Text } = Typography;

  console.log(event);
  return (
    <div className="event-item">
      <div className="event-item-day">03</div>
      <div className="event-item-info">
        <Link to="/">
          <div>
            <Title level={4}>{ event.title }</Title>
          </div>
          <div>
            Ponente
          </div>
          <div>
            Lugar
          </div>
        </Link>
      </div>
    </div>
  );
}

export default EventItem;
