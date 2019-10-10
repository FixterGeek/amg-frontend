/* eslint-disable no-lonely-if */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Typography } from 'antd';

import useSweet from '../../hooks/useSweetAlert';
import { subscribeUserToEventAction } from '../../store/ducks/userDuck';
import EventCover from '../../molecules/EventCover';
import TextBlock from '../../atoms/TextBlock';
import TextNIconButton from '../reusables/TextNIconButton';
import Spinner from '../reusables/Spinner';
import MapLocation from './reusables/MapLocation';
import SubscribeButton from './reusables/SubscribeButton';
import ContainerItem from '../reusables/ContainerItem';
import { LineCap } from '../feed/reusables/Icons';

import useAmgService from '../../hooks/services/useAmgService';

function EventDetail({
  history, userFetching, userError,
  userStatus
}) {
  const { location } = history;
  const { Title } = Typography;

  const { errorAlert, successAlert } = useSweet();
  const { getSingleEvent } = useAmgService();
  const [state, setState] = useState({
    description: [],
    permisosURLS: [],
    location: {
      coordinates: [],
    },
  });


  useEffect(() => {
    if (userError !== undefined) errorAlert({});
  }, [userError]);

  useEffect(() => {
    if (location.state) {
      setState({ ...location.state });
    } else {
      if (!state._id) {
        const locationSplit = location.pathname.split('/');
        const id = locationSplit[locationSplit.length - 1];
        getSingleEvent(id).then(({ data }) => setState({ ...data }));
      }
    }
  }, []);

  useEffect(() => {
    if (userStatus === 'success') {
      successAlert({
        text: 'Hemos enviado la reservación a tu correo. Recuerda que también puedes consultarla desde mis eventos.'
      });
    } 
  })


  return (
    <div className="dashboard-container event-detail">
      { !state._id && <Spinner /> }
      { userFetching && <Spinner /> }
      <div className="title">
        <Title>{state.title}</Title>
      </div>
      <div className="event-details">
        <div className="left">
          {state.thumbnailImagesURLS && (
            <EventCover
              title={state.title}
              location={state.location}
              startDate={state.startDate}
              endDate={state.endDate}
              image={state.mainImagesURLS[0]}
            />
          )}
          <TextNIconButton
            text="Ver programa"
            icon="bino"
            to={{ pathname: `/dashboard/events/${state._id}/program`, event: state }} />
          <TextNIconButton
            text="Ver ponentes"
            icon="micro"
            to={{ pathname: `/dashboard/events/${state._id}/speakers`, state }} />
          <TextNIconButton
            text="Ver cursos"
            icon="cap"
            to={{ pathname: `/dashboard/events/${state._id}/cursos`, state }} />
          <TextNIconButton
            iconStyle={{ marginRight: '6px' }}
            downloadable
            to={state.permisosURLS[0]}
            event={state}
            text="Descargar carta permiso"
          />
          <SubscribeButton payable eventObject={state} />
        </div>
        <div className="right">
          <Title level={2}>Ubicación</Title>
          <ContainerItem>
            {
              state._id && (
                <MapLocation
                  street={state.location.street}
                  colony={state.location.colony}
                  city={state.location.city}
                  zipCode={state.location.zipCode}
                  coordinates={state.location.coordinates}
                />
              )
            }
          </ContainerItem>

          {state.description[0] && (
            <TextBlock title="Dirigido a" text={state.description[0]} />
          )}
          {state.description[1] && (
            <TextBlock title="Valor curricular" text={state.description[1]} />
          )}
          {state.description[2] && (
              <TextBlock title="Objetivo" text={state.description[2]} ></TextBlock>
          )}
          <div style={{fontSize:"1.8em"}}>
          <h3>Objetivos</h3>
          <p>1. Confrontar las opiniones de expertos en campos controversiales de la gastroenterología, exponiendo la evidencia actual a favor y en contra de cada posición.
            <br/>
            <br/>
            2. Complementar la información expuesta con casos clínicos que serán discutidos por los profesores y los asistentes en general.</p>
        </div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps({ events, user }) {
  return { 
    user,
    events,
    userFetching: user.fetching,
    assistedEvents: user.assistedEvents,
    userError: user.error,
    userStatus: user.status,
  };
}

export default withRouter(connect(mapStateToProps, { subscribeUserToEventAction })(EventDetail));
