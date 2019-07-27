import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Typography } from 'antd';

import useAmgService from '../../hooks/services/useAmgService';
import DashboardContainerItem from '../../atoms/DashboardContainerItem';
import EventCover from '../../molecules/EventCover';
import ActivityItem from '../../molecules/Events/ActivityItem';
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

    runAsync();
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
      <DashboardContainerItem>
        {
          eventState && eventState.program.map((module) => {
            return (
              <DashboardContainerItem key={module._id}>
                <Title level={3} style={{ marginTop: '32px', marginBottom: '32px' }}>
                  { module.title }
                </Title>
                <div>
                  {
                    module.activities.map((activityId) => {
                      const activity = getLocalActivity(activityId)[0];
                      return (
                        <ActivityItem
                          key={activity._id}
                          hour={activity.date}
                          title={activity.activityName}
                          level1={activity.speaker.fullName}
                          level2={activity.location.addressName}
                          to={`/dashboard/events/${eventState._id}/program/${activity._id}`}
                          activity={activity} />
                      );
                    })
                  }
                </div>
              </DashboardContainerItem>
            );
          })
        }
      </DashboardContainerItem>
    </div>
  );
}

function mapStateToProps(state) {
  return { events: state.events };
}

export default connect(mapStateToProps)(Program);
