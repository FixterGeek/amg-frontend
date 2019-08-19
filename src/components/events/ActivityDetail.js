import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Typography } from 'antd';

import { subscribeUserToActivityAction } from '../../store/ducks/userDuck';
import useSweet from '../../hooks/useSweetAlert';
import useAmgService from '../../hooks/services/useAmgService';
import DashboardContainerItem from '../../atoms/DashboardContainerItem';
import ProfilePhoto from '../../atoms/ProfilePhoto';
import AmgButton from '../../atoms/Button';
import MapLocation from './reusables/MapLocation';
import Spinner from '../../atoms/Spinner';

function ActivityDetail({ history, user, subscribeUserToActivityAction }) {
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
  const { speakers = [], limit = false, location = {} } = activity;
  const { colony = '', zipCode = '', street = ''} = location;
  const soulout = limit === 0 ? true : false;
  const registered = user.assistedActivities.includes(activity._id);


  useEffect(() => {
    const runAsync = async () => {
      const { pathname } = history.location;
      const id = pathname.split('/')[5];

      if (!history.location.state) {
        await getSingleActivity(id).then(({ data }) => {
          setActivity({ ...data });
        }).catch(({ response }) => console.log(response));
      } else {
        setActivity({ ...history.location.state });
      }
    };

    if (!activity._id) runAsync();
  }, []);


  const subscribeToActivity = (activityId) => {
    subscribeUserToActivityAction(activityId).then(({ data }) => {
      successAlert({
        text: 'Hemos enviado la reservación a tu correo. Recuerda que también puedes consultarla desde mis eventos.'
      })
    }).catch(({ response }) => errorAlert({}));
  };

  console.log(activity)


  return (
    <div className="dashboard-container activity-detail  relative">
      { user.fetching && <Spinner /> }
      <DashboardContainerItem>
        <Title>{ activity.activityType }</Title>
      </DashboardContainerItem>
      <DashboardContainerItem>
        <Title level={3}>{ activity.activityName }</Title>
      </DashboardContainerItem>
      <DashboardContainerItem>
        <Text>{ activity.description }</Text>
      </DashboardContainerItem>
      <DashboardContainerItem>
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
      </DashboardContainerItem>
      <DashboardContainerItem>
        <MapLocation
          street={location.street}
          colony={location.colony}
          city={location.city}
          zipCode={location.zipCode}
          coordinates={location.coordinates}
        />
      </DashboardContainerItem>
      <DashboardContainerItem style={{ textAlign: 'center' }}>
        {/* { user.membershipStatus === 'Free' && 
          <AmgButton width="100%">
            <Link to="/dashboard/settings">Convierte en socio</Link>
          </AmgButton>
        } */}
        {
          (
            (user.membershipStatus === 'Socio' || user.membershipStatus === 'Mesa Directiva' || user.membershipStatus === 'Free')
            || (user.membershipStatus === 'Residente' && activity.isOpen)
          )
            && (
              <div>
                <AmgButton
                  bgColor={soulout ? 'red' : registered ? 'green' : 'secondary'}
                  disabled={registered || soulout || (user.userStatus === 'No Aprobado')}
                  width="100%"
                  onClick={() => subscribeToActivity(activity._id)}>
                  { soulout ? 'Actividad agotada' : registered ? 'Inscrito' : 'Inscribirme' }
                </AmgButton>
                <div style={{ color: '#f1a153' }}>
                  { limit ? 'Esta actividad es de cupo limitado*' : '' }
                </div>
              </div>
            ) 
        }
        {
          (user.membershipStatus === 'Residente' && !activity.isOpen) ? (
            <div>
              <AmgButton
                width="100%"
                bgColor={soulout ? 'red' : 'secondary'}
                disabled={soulout}>
                <Link to={{
                  pathname: `/dashboard/payment/activity/${activity._id}`,
                  state: activity,
                }}>
                  { soulout ? 'Actividad agotada' : 'Pagar por esta actividad' }
                </Link>
              </AmgButton>
              <div style={{ color: '#f1a153' }}>
                { limit ? 'Esta actividad es de cupo limitado*' : '' }
              </div>
            </div>
          ) : null
        }
      </DashboardContainerItem>
    </div>
  );
}

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps, { subscribeUserToActivityAction })(ActivityDetail);
