import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Typography } from 'antd';

import useAmgService from '../../hooks/services/useAmgService';
import ProfilePhoto from '../../atoms/ProfilePhoto';
import AmgButton from '../../atoms/Button';

function ActivityDetail({ history, user }) {
  const { getSingleActivity, activitySubscribe } = useAmgService();
  const [activity, setActivity] = useState({
    activityType: '',
    activityName: '',
    speaker: {},
    amgSpeaker: {},
    location: {},
  });
  const { speaker } = activity;
  const { location } = history;
  const { Title, Text } = Typography;


  useEffect(() => {
    const { pathname } = location;
    const id = pathname.split('/')[5];

    if (!location.state) {
      getSingleActivity(id).then(({ data }) => {
        console.log(data);
        setActivity({ ...data });
      }).catch(({ response }) => console.log(response));
    } else {
      setActivity({ ...location.state });
    }
  }, []);


  const subscribeToActivity = (eventId) => {
    console.log(eventId);
    activitySubscribe(eventId).then(response => console.log(response))
      .catch(({ response }) => console.log(response));
  };

  console.log(activity);


  return (
    <div className="dashboard-container">
      <div>
        <Title>{ activity.activityType }</Title>
      </div>
      <div>
        <Title level={3}>{ activity.activityName }</Title>
      </div>
      <div>
        { activity.description }
      </div>
      <div>
        <div>
          <Title level={3}>Ponente</Title>
        </div>
        <div>
          <div>
            <ProfilePhoto photoURL={speaker.photoURL} />
          </div>
          <div>
            <Text>{ speaker.fullName }</Text>
            <Text>{ speaker.professionalTitle }</Text>
            <Text>{ speaker.origin }</Text>
          </div>
        </div>
      </div>
      <div>
        {
          user.membershipStatus === 'Free' ? (
            <AmgButton width="100%"> Pagar por esta actividad </AmgButton>
          ) : (
            <AmgButton width="100%" onClick={() => subscribeToActivity(activity._id)}>
              Inscribirse
            </AmgButton>
          )
        }
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(ActivityDetail);
