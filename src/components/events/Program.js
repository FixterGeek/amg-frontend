import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { Typography } from 'antd';

import useSweetAlert from '../../hooks/useSweetAlert';
import { getSingleEvent } from '../../services/eventsServices';
import ContainerItem from '../reusables/ContainerItem';
import EventCover from '../../molecules/EventCover';
import ActivityItem from '../../molecules/Events/ActivityItem';
import Spinner from '../../atoms/Spinner';
import BoxItem from '../reusables/BoxItem';

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
    <div className="events-program dashboard-container">
      { loading && <Spinner tip="Cargando programa..." /> }
      <ContainerItem>
        <Title>Programa</Title>
      </ContainerItem>
      <ContainerItem>
        { eventState && (
        <EventCover
          title={eventState.title}
          location={eventState.location}
          startDate={eventState.startDate}
          endDate={eventState.endDate}
          image={eventState.mainImagesURLS[0]} />
        )
        }
      </ContainerItem>
      {
        eventState && eventState.modules.map((modul) => {
          return (
            <ContainerItem>
              <Title level={3} style={{ marginTop: '32px', marginBottom: '32px' }}>
                { modul.title }
              </Title>
              <ContainerItem>
                {
                  modul.activities.map((activity) => {
                    let speakers = activity.speakers.map(speaker => {
                      if (speaker.fullName) return `${speaker.fullName}`;
                      return ' ';
                    });
                    return (
                      <BoxItem
                        className="event-program-box-item"
                        title={activity.activityName}
                        subtitle={speakers.join()}
                        footer={activity.address || activity.type}
                        leftContent={
                          `${moment(activity.startTime).format('hh:mm a')} - ${moment(activity.endTime).format('hh:mm a')}`
                        }
                        leftStyle={{ paddingRight: '16px', flexShrink: 0 }}
                        to={`/dashboard/events/${eventState._id}/program/${activity._id}`}
                        linkState={activity}
                      />
                        // <ActivityItem
                        // className={
                        //   user.assistedActivities.includes(activity._id) ? 'bg-green' : ''
                        // }
                        // key={activity._id}
                        // hour={moment(activity.startTime).format('hh:mm a')}
                        // hour2={moment(activity.endTime).format('hh:mm a')}
                        // title={activity.activityName}
                        // level1={speakers.join()}
                        // level2={activity.address || activity.type}
                        // to={`/dashboard/events/${eventState._id}/program/${activity._id}`}
                        // activity={activity} />
                    );
                  })
                }
              </ContainerItem>
            </ContainerItem>
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
