import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Typography } from 'antd';

import { subscribeUserToActivityAction } from '../../store/ducks/userDuck';
import useSweet from '../../hooks/useSweetAlert';
import useAmgService from '../../hooks/services/useAmgService';
import ContainerItem from '../reusables/ContainerItem';
import ProfilePhoto from '../../atoms/ProfilePhoto';
import MapLocation from './reusables/MapLocation';
import Spinner from '../reusables/Spinner';
import SubscribeButton from './reusables/SubscribeButton'

function ActivityDetail({
  history, user, subscribeUserToActivityAction,
  userFetching, userStatus,
}) {
  const { Title, Text } = Typography;

  const { errorAlert, successAlert } = useSweet();
  const { getSingleActivity } = useAmgService();
  const [activity, setActivity] = useState({
    activityType: '',
    activityName: '',
    description: '',
    speaker: {},
    amgSpeaker: {},
    location: {
      street: '',
      colony: '',
      zipCode: '',
    },
    assistants: [],
    _id: null,
  });

  const { speakers = [], location = {} } = activity;


  useEffect(() => {
    if (userStatus === 'error') {
      errorAlert({ text: 'No fue posible completar la inscripción' });
    }
  }, [userStatus])

  useEffect(() => {
    const runAsync = async () => {
      const { pathname } = history.location;
      const id = pathname.split('/')[5];

      if (!history.location.state) {
        await getSingleActivity(id).then(({ data }) => {
          setActivity({ ...data });
        }).catch(({ response }) => response);
      } else {
        setActivity({ ...history.location.state });
      }
    };

    if (!activity._id) runAsync();
  }, []);


  return (
    <div className="dashboard-container activity-detail  relative">
      { userFetching && <Spinner /> }
      <ContainerItem>
        <Title>{ activity.activityType }</Title>
      </ContainerItem>
      <ContainerItem>
        <Title level={3}>{ activity.activityName }</Title>
      </ContainerItem>
      <ContainerItem>
        <Text>{ activity.description }</Text>
      </ContainerItem>
      <ContainerItem>
        <div>
          <Title level={3}>Ponente</Title>
        </div>
        {
          speakers.map(speaker => {
            return (
              <div className="activity-detail-speaker">
                <div>
                  <ProfilePhoto photoURL={speaker.photoURL} />
                </div>
                <div className="activity-detail-speaker-info">
                  <Text strong>{ speaker.fullName }</Text>
                  <Text>{ speaker.professionalTitle }</Text>
                  <Text>{ speaker.origin }</Text>
                </div>
              </div>
            );
          })
        }
      </ContainerItem>
      <ContainerItem>
        <MapLocation
          street={location.street}
          colony={location.colony}
          city={location.city}
          zipCode={location.zipCode}
          coordinates={location.coordinates}
        />
      </ContainerItem>
      <ContainerItem style={{ textAlign: 'center' }}>
        { activity._id && <SubscribeButton activityObject={activity} />}
      </ContainerItem>
    </div>
  );
}

function mapStateToProps({ user }) {
  return {
    user,
    userStatus: user.status,
    userFetching: user.fetching,
  };
}

export default connect(mapStateToProps, { subscribeUserToActivityAction })(ActivityDetail);
