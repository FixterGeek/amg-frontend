import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

import { Typography } from 'antd';

import useAmgService from '../../hooks/services/useAmgService';
import DashboardContainerItem from '../../atoms/DashboardContainerItem';
import ProfilePhoto from '../../atoms/ProfilePhoto';
import AmgButton from '../../atoms/Button';

function ActivityDetail({ history, user }) {
  const { getSingleActivity, activitySubscribe } = useAmgService();
  const [activity, setActivity] = useState({
    activityType: '',
    activityName: '',
    description: '',
    speaker: {},
    amgSpeaker: {},
    location: {},
    assistants: [],
    _id: null,
  });
  const { speaker } = activity;
  const { location } = history;
  const { Title, Text } = Typography;


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


  const subscribeToActivity = (activityId) => {
    activitySubscribe(activityId).then(({ data }) => {
      const { assistants } = data;
      setActivity({ ...data });

      if (assistants.includes(user._id)) {
        Swal.fire({
          title: 'Listo',
          text: 'Hemos enviado la reservación a tu correo. Recuerda que también puedes consultarla desde mis eventos.',
          type: 'success',
          confirmButtonText: 'Entendido',
        });
      } else {
        Swal.fire({
          title: 'Calcelado',
          text: 'Tu asistencia al evento a sido cancelada',
          type: 'info',
          confirmButtonText: 'Entendido',
        });
      }
    }).catch(({ response }) => console.log(response));
  };


  return (
    <div className="dashboard-container activity-detail">
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
      </DashboardContainerItem>
      <DashboardContainerItem style={{ textAlign: 'center' }}>
        {
          user.membershipStatus === 'Free' ? (
            <AmgButton width="100%"> Pagar por esta actividad </AmgButton>
          ) : (
            <AmgButton width="100%" onClick={() => subscribeToActivity(activity._id)}>
              {
                activity.assistants.includes(user._id) ? 'Cancelar inscripción' : 'Inscribirme'
              }
            </AmgButton>
          )
        }
      </DashboardContainerItem>
    </div>
  );
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(ActivityDetail);
