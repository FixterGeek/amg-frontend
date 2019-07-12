import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Typography } from 'antd';

import EventCover from '../../molecules/EventCover';
import TextBlock from '../../atoms/TextBlock';
import AmgButton from '../../atoms/Button';

import useAmgService from '../../hooks/services/useAmgService';

function EventDetail(props) {
  const { history } = props;
  //const { params } = match;
  const { location } = history;

  const { Title } = Typography;

  const { getSingleEvent } = useAmgService();
  const [state, setState] = useState({});

  useEffect(() => {
    if (location.event) {
      setState({ ...location.event });
    } else {
      const locationSplit = location.pathname.split('/');
      const id = locationSplit[locationSplit.length - 1];
      getSingleEvent(id).then(({ data }) => setState({ ...data }));
    }
  }, []);

  return (
    <div className="dashboard-container event-detail">
      <div className="title">
        <Title>{ state.title }</Title>
      </div>
      <div className="event-details">
        <div className="left">
          {
            state.photoURL && (
              <EventCover
                title={state.title}
                location={state.location}
                startDate={state.startDate}
                endDate={state.endDate}
                image={state.photoURL} />
            )
          }
        </div>
        <div className="right">
          { state.directedTo && <TextBlock title="Dirigido a" text={state.directedTo} /> }
          { state.curricularValue && <TextBlock title="Valor curricular" text={state.curricularValue} /> }
          <div className="right-button">
            <AmgButton width="100%">Inscribirme</AmgButton>
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
