import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Typography } from 'antd';

import EventCover from '../../molecules/EventCover';

import useAmgService from '../../hooks/services/useAmgService';

function EventDetail(props) {
  const { match, history } = props;
  const { params } = match;
  const { location } = history;

  const { Title } = Typography;

  const { getSingleEvent } = useAmgService();
  const [state, setState] = useState({});

  useEffect(() => {
    if (location.event) {
      setState(location.event);
    } else {
      const locationSplit = location.pathname.split('/');
      const id = locationSplit[locationSplit.length - 1];
      getSingleEvent(id).then(({ data }) => setState({ ...data }));
    }
  }, []);

  console.log(props);
  console.log(state);

  return (
    <div className="dashboard-container event-detail">
      <div>
        <Title>Trilogia</Title>
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
        <div className="right">ok</div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return { events: state.events };
}

export default withRouter(connect(mapStateToProps)(EventDetail));
