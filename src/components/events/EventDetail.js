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
import AmgButton from '../../atoms/Button';
import TextNIconButton from '../../atoms/TextNIconButton';
import Spinner from '../../atoms/Spinner';
import MapLocation from './reusables/MapLocation';

import useAmgService from '../../hooks/services/useAmgService';

function EventDetail({
  history, subscribeUserToEventAction, userFetching,
  assistedEvents, userError, user
}) {
  const { location } = history;
  const { Title } = Typography;

  const { errorAlert } = useSweet();
  const { getSingleEvent, assistAnEvent } = useAmgService();
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

  const subscribeToEvent = () => {
    subscribeUserToEventAction(state._id)
  };

  useEffect(() => {
    if (location.event) {
      setState({ ...location.event });
    } else {
      if (!state._id) {
        const locationSplit = location.pathname.split('/');
        const id = locationSplit[locationSplit.length - 1];
        getSingleEvent(id).then(({ data }) => setState({ ...data }));
      }
    }
  }, []);

  console.log(state)


  return (
    <div className="dashboard-container event-detail">
      { !state._id && <Spinner tip="Cargando evento..." /> }
      { userFetching && <Spinner tip="Inscribiendo..." /> }
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
            downloadable
            to={state.permisosURLS[0]}
            event={state}
            text="Descargar carta permiso"
          />
        </div>
        <div className="right">
          {state.description[0] && (
            <TextBlock title="Dirigido a" text={state.description[0]} />
          )}
          {state.description[1] && (
            <TextBlock title="Valor curricular" text={state.description[1]} />
          )}
          {state.description[2] && (
            <TextBlock title="Objetivo" text={state.description[2]} />
          )}

          <Title level={2}>Ubicación</Title>
          <MapLocation
            street={state.location.street}
            colony={state.location.colony}
            city={state.location.city}
            zipCode={state.location.zipCode}
            coordinates={state.location.coordinates} />

          <div className="right-button">
            <AmgButton
              width="100%"
              bgColor={assistedEvents.includes(state._id) ? 'green' : 'secondary'}
              disabled={assistedEvents.includes(state._id) || (user.userStatus === 'No Aprobado')}
              onClick={subscribeToEvent} >
              { assistedEvents.includes(state._id) ? 'Inscrito' : 'Inscribirme'}
            </AmgButton>
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
  };
}

export default withRouter(connect(mapStateToProps, { subscribeUserToEventAction })(EventDetail));
