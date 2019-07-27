import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import uniqid from 'uniqid';

import { updateEvents } from '../../store/actions';
import useAmgService from '../../hooks/services/useAmgService';
import Covers from '../../organisms/events/Covers';
import EventsMonth from '../../molecules/Events/EventsMonth';

function EventsList(props) {
  // eslint-disable-next-line react/prop-types
  const { events, dispatch } = props;
  const { getEvents } = useAmgService();

  const [state, setState] = useState({
    byMonths: [],
  });

  useEffect(() => {
    console.log(events.events);
    const byMonths = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(month => ({
      month,
      events: events.events.filter(
        event => moment(event.startDate.replace('/', '-').replace('/', '-')).month() === month,
      ),
    }));

    setState({
      byMonths,
    });
  }, [events]);

  useEffect(() => {
    if (events.events.length === 0) {
      getEvents().then(({ data }) => {
        dispatch(updateEvents({ events: [...data] }));
      }).catch(({ response }) => {
        console.log(response);
      });
    }
  }, [dispatch, events.events.length, getEvents]);

  return (
    <div className="dashboard-container">
      <Covers events={events.events} />
      <div>
        {
          state.byMonths.map(month => (
            <EventsMonth key={uniqid()} month={month.month} events={month.events} />
          ))
        }
      </div>
    </div>
  );
}


function mapStateToProps(state) {
  return { events: state.events };
}

export default withRouter(connect(mapStateToProps)(EventsList));
