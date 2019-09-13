/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { Typography } from 'antd';

import useSweetAlert from '../../hooks/useSweetAlert';
import { getSingleEvent } from '../../services/eventsServices';
import ContainerItem from '../reusables/ContainerItem';
import EventCover from '../../molecules/EventCover';
import Spinner from '../reusables/Spinner';
import BoxItem from '../reusables/BoxItem';

function Program({ history, user }) {
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
      .catch(() => {
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
        eventState && eventState.modules.map(modul => (
          <ContainerItem>
            <Title level={3} style={{ marginTop: '32px', marginBottom: '32px' }}>
              { modul.title }
            </Title>
            <ContainerItem>
              {
                  modul.activities.map((activity) => {
                    const speakers = activity.speakers.map((speaker) => {
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
                    );
                  })
                }
            </ContainerItem>
          </ContainerItem>
        ))
      }
    </div>
  );
}

function mapStateToProps({ events, user }) {
  return { events, user };
}

export default connect(mapStateToProps)(Program);
