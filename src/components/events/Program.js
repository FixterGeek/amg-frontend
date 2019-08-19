import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { Typography } from 'antd';

import useSweetAlert from '../../hooks/useSweetAlert';
import { getSingleEvent } from '../../services/eventsServices';
import DashboardContainerItem from '../../atoms/DashboardContainerItem';
import EventCover from '../../molecules/EventCover';
import ActivityItem from '../../molecules/Events/ActivityItem';
import Spinner from '../../atoms/Spinner';

function Program({ history, events, user }) {
  const { Title } = Typography;

  const { errorAlert } = useSweetAlert();
  const [eventState, setEvent] = useState();
  const [loading, setLoading] = useState(false);
  const { location } = history;


  useEffect(() => {
    const { pathname } = location;
    const id = pathname.split('/')[3];

    setLoading(true);
    getSingleEvent(id)
      .then((data) => {
        setEvent(data);
        setLoading(false);
      })
      .catch(({ response }) => {
        setLoading(false);
        errorAlert({});
      });
  }, []);

  console.log(user);

  return (
    <div className="dashboard-container">
      { loading && <Spinner tip="Cargando programa..." /> }
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
        eventState && eventState.modules.map((modul) => {
          return (
            <DashboardContainerItem>
              <Title level={3} style={{ marginTop: '32px', marginBottom: '32px' }}>
                { modul.title }
              </Title>
              <div>
                {
                  modul.activities.map((activity) => {
                    const speakers = activity.speakers.map(speaker => `${speaker.fullName} `);
                    return (
                      <ActivityItem
                        className={
                          user.assistedActivities.includes(activity._id) ? 'bg-green' : ''
                        }
                        key={activity._id}
                        hour={moment(activity.startTime).format('hh:mm a')}
                        hour2={moment(activity.endTime).format('hh:mm a')}
                        title={activity.activityName}
                        level1={speakers.join()}
                        level2={activity.address || activity.type}
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

function mapStateToProps({ events, user }) {
  return { 
    events,
    user
  };
}

export default connect(mapStateToProps)(Program);
