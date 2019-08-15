/* eslint-disable no-lonely-if */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Typography } from 'antd';

import EventCover from '../../molecules/EventCover';
import TextBlock from '../../atoms/TextBlock';
import AmgButton from '../../atoms/Button';
import TextNIconButton from '../../atoms/TextNIconButton';
import Spinner from '../../atoms/Spinner';

import useAmgService from '../../hooks/services/useAmgService';

function EventDetail(props) {
  const { history } = props;
  const { location } = history;

  const { Title } = Typography;

  const { getSingleEvent, assistAnEvent } = useAmgService();
  const [state, setState] = useState({
    description: [],
    permisosURLS: [],
  });


  const subscribeToEvent = () => {
    assistAnEvent(state._id).then(({ data }) => {
      console.log(data);
    }).catch(({ response }) => {
      console.log(response);
    });
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
  }, [getSingleEvent, location.event, location.pathname]);

  console.log(state);

  return (
    <div className="dashboard-container event-detail">
      { !state._id && <Spinner tip="Cargando evento..." /> }
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
              image={state.thumbnailImagesURLS[0]}
            />
          )}
          <TextNIconButton
            text="Ver programa"
            icon="bino"
            to={{ pathname: `/dashboard/events/${state._id}/program`, event: state }} />
          <TextNIconButton
            text="Ver ponentes"
            icon="micro"
            to={{ pathname: `/dashboard/events/${state._id}/speakers`, event: state }} />
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

          <div className="right-button">
            <AmgButton width="100%" onClick={subscribeToEvent}>
              Inscribirme
            </AmgButton>
          </div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return { events: state.events };
}

export default withRouter(connect(mapStateToProps)(EventDetail));
