import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

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

    const runAsync = async () => {
      if (!location.state) {
        await getSingleActivity(id).then(({ data }) => {
          setActivity({ ...data });
        }).catch(({ response }) => console.log(response));
      } else {
        setActivity({ ...location.state });
      }
    };

    runAsync();
  }, []);


  const subscribeToActivity = (activityId) => {
    activitySubscribe(activityId).then(({ data }) => {
      const { assistants } = data;
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
