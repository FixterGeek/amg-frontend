import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Typography } from 'antd';

import useAmgService from '../../hooks/services/useAmgService';
import DashboardContainerItem from '../../atoms/DashboardContainerItem';
import EventCover from '../../molecules/EventCover';
import ActivitiesList from '../../molecules/Events/ActivitiesList';
import Spinner from '../../atoms/Spinner';

function Program({ history }) {
  const { getSingleEvent, getActivitiesForEvent } = useAmgService();
  const [eventState, setEventState] = useState();
  const [activitiesState, setActivitiesState] = useState();
  const { location } = history;
  const { Title } = Typography;


  useEffect(() => {
    const { pathname } = location;
    const id = pathname.split('/')[3];

    const runAsync = async () => {
      await getActivitiesForEvent(id).then(({ data }) => {
        setActivitiesState(data);
      }).catch(({ response }) => console.log(response));

      if (!location.event) {
        getSingleEvent(id).then(({ data }) => setEventState(data))
          .catch(error => console.log(error));
      } else {
        setEventState(location.event);
      }
    };

    if (!eventState || !activitiesState) runAsync();
  }, [getActivitiesForEvent, getSingleEvent, location]);


  const getLocalActivity = activityId => activitiesState.filter(activity => activity._id === activityId);

  return (
    <div className="dashboard-container">
      { !eventState && <Spinner tip="Cargando programa..." /> }
      <DashboardContainerItem>
        <Title>Programa</Title>
      </DashboardContainerItem>
      <DashboardContainerItem>
        { eventState && (
        <EventCover
          title={eventState.title}
          location={eventState.location}
          startDate={eventState.startDate}
          endDate={eventState.endDate}
          image={eventState.mainImagesURLS[0]} />
        )
        }
      </DashboardContainerItem>
      { eventState && <ActivitiesList event={eventState} getLocalActivity={getLocalActivity} /> }
    </div>
  );
}

function mapStateToProps(state) {
  return { events: state.events };
}

export default connect(mapStateToProps)(Program);
