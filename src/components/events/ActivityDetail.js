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
  const { speakers = [], limit = false } = activity;
  const { location } = history;
  const { coordinates = [] } = location;
  const soulout = limit === 0 ? true : false;
  const registered = user.assistedActivities.includes(activity._id);


  useEffect(() => {
    const runAsync = async () => {
      const { pathname } = location;
      const id = pathname.split('/')[5];

      if (!location.state) {
        await getSingleActivity(id).then(({ data }) => {
          setActivity({ ...data });
        }).catch(({ response }) => console.log(response));
      } else {
        setActivity({ ...location.state });
      }
    };

    if (!activity._id) runAsync();
  }, [location, getSingleActivity]);

  useEffect(() => {
    let script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBAXOLs6pgumFSwvd3R3bqU4y2Cvm8Azj4';
    document.body.appendChild(script);
    script.onload = () =>{
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 19.4199552, lng: -99.1567872 },
        zoom: 8,
      });

      const marker = new window.google.maps.Marker({
        position: { lat: 19.4199552, lng: -99.1567872 },
        map,
        title: 'Here!',
      });
    }
  }, [window.google]);


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
        <div id="map" className="component-map" />
        <div>
          <Text strong>{ location.addressName }</Text>
          { `${location.street}, ${location.colony}, ${location.zipCode}` }
        </div>
      </DashboardContainerItem>
      <DashboardContainerItem style={{ textAlign: 'center' }}>
        { user.membershipStatus === 'Free' && 
          <AmgButton width="100%">
            <Link to="/dashboard/settings">Convierte en socio</Link>
          </AmgButton>
        }
        {
          (user.membershipStatus === 'Socio' || user.membershipStatus === 'Mesa Directiva')
            && (
              <div>
                <AmgButton
                  bgColor={soulout ? 'red' : registered ? 'green' : 'secondary'}
                  disabled={registered || soulout}
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
          user.membershipStatus === 'Residente' ? (
            <div>
              <AmgButton
                width="100%"
                bgColor={soulout ? 'red' : 'secondary'}
                disabled={soulout}>
                <Link to={`/dashboard/payment/activity/${activity._id}`}>
                  { soulout ? 'Actividad agotada' : 'Pagar por esta actividad' }
                </Link>
              </AmgButton>
              <div style={{ color: '#f1a153' }}>
                { limit ? 'Esta actividad es de cupo limitado*' : '' }
              </div>
            </div>
          ) : null
        }
        {/* {
          user.membershipStatus === 'Free' ? (
            <AmgButton width="100%">
              <Link>Convierte en socio</Link>
            </AmgButton>
          ) : (
            <AmgButton width="100%" onClick={() => subscribeToActivity(activity._id)}>
              {
                activity.assistants.includes(user._id) ? 'Cancelar inscripción' : 'Inscribirme'
              }
            </AmgButton>
          )
        } */}
      </DashboardContainerItem>
    </div>
  );
}

function mapStateToProps({ user }) {
  return { user };
}

export default connect(mapStateToProps, { subscribeUserToActivityAction })(ActivityDetail);
