import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

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
        await getSingleEvent(id).then(({ data }) => setEventState(data))
          .catch(error => console.log(error));
      } else {
        setEventState(location.event);
      }
    };

    if (!activitiesState) runAsync();
  }, [getActivitiesForEvent, getSingleEvent, location]);

  console.log(activitiesState);


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
      {
        eventState && eventState.program.map((modul) => {
          return (
            <DashboardContainerItem>
              <Title level={3} style={{ marginTop: '32px', marginBottom: '32px' }}>
                { modul.title }
              </Title>
              <div>
                {
                  modul.activities.map((activityId) => {
                    console.log(activityId);
                    let activity = null;
                    if (!activityId._id) activity = getLocalActivity(activityId)[0];
                    else activity = activityId;
                    console.log(activity);
                    return (
                      <ActivityItem
                        key={activity._id}
                        hour={moment(activity.date).format('hh:mm a')}
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
    </div>
  );
}

function mapStateToProps(state) {
  return { events: state.events };
}

export default connect(mapStateToProps)(Program);
