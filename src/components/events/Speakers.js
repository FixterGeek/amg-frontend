import React, { useState, useEffect } from 'react';
import uniqid from 'uniqid';

import { Typography } from 'antd';

import useAmgService from '../../hooks/services/useAmgService';
import SpeakerItem from '../../molecules/Events/SpeakerItem';
import Spinner from '../../atoms/Spinner';

function Speakers({ history }) {
  const [activities, setActivities] = useState([]);
  const { getActivitiesForEvent } = useAmgService();
  const { Title } = Typography;
  const { location } = history;


  useEffect(() => {
    const id = location.pathname.split('/')[3];
    if (!activities[0]) {
      getActivitiesForEvent(id).then(({ data }) => {
        setActivities(data);
      }).catch(({ response }) => console.log(response));
    }
  }, [activities, getActivitiesForEvent, location.pathname]);


  return (
    <div className="dashboard-container">
      { !activities[0] && <Spinner tip="Cargando ponentes..." /> }
      <div>
        <Title>Ponentes</Title>
      </div>
      <div>
        {
          activities.map((activity) => {
            const { speaker } = activity;
            return (
              <SpeakerItem
                key={uniqid()}
                photoURL={speaker.photoURL}
                title={speaker.fullName}
                level1={speaker.professionalTitle}
                level2={speaker.origin}
                state={speaker} />
            );
          })
        }
      </div>
    </div>
  );
}

export default Speakers;
