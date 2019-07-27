import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Typography } from 'antd';

import useAmgService from '../../hooks/services/useAmgService';
import EventCover from '../../molecules/EventCover';
import ActivityItem from '../../molecules/Events/ActivityItem';

function Program({ event, dispatch, history }) {
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
  }, []);


  const getLocalActivity = activityId => activitiesState.filter(activity => activity._id === activityId);


  return (
    <div className="dashboard-container">
      <div>
        <Title>Programa</Title>
      </div>
      <div>
        { eventState && (
        <EventCover
          title={eventState.title}
          location={eventState.location}
          startDate={eventState.startDate}
          endDate={eventState.endDate}
          image={eventState.mainImagesURLS[0]} />
        )
        }
      </div>
      <div>
        {
          eventState && eventState.program.map((module) => {
            return (
              <div>
                <Title level={3}>{ module.title }</Title>
                <div>
                  {
                    module.activities.map((activityId) => {
                      const activity = getLocalActivity(activityId)[0];
                      return (
                        <ActivityItem
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
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return { events: state.events };
}

export default connect(mapStateToProps)(Program);
