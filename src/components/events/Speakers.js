import React, { useState, useEffect } from 'react';

import { Typography } from 'antd';

import SpeakerItem from '../../molecules/Events/SpeakerItem';
import Spinner from '../../atoms/Spinner';

function Speakers({ history }) {
  const [event, setEvent] = useState({
    speakers: []
  });

  const { Title } = Typography;
  const { location } = history;


  useEffect(() => {
    if (!event._id) setEvent({ ...event, ...location.state })
  }, [location.state]);


  return (
    <div className="dashboard-container">
      { !event._id && <Spinner tip="Cargando ponentes..." /> }
      <div>
        <Title>Ponentes</Title>
      </div>
      <div>
        {
          event.speakers.map((speaker) => {
            return (
              <SpeakerItem
                key={speaker._id}
                photoURL={speaker.photoURL}
                title={speaker.fullName}
                level1={speaker.title}
                level2={speaker.city}
                state={speaker}
                to={`/dashboard/events/${event._id}/speakers/${speaker._id}`}
              />
            );
          })
        }
      </div>
    </div>
  );
}

export default Speakers;
