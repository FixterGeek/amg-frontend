import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Typography } from 'antd'

import useSweetAlert from '../../hooks/useSweetAlert';
import { populateEventsAction } from '../../store/ducks/eventsDuck';
import Spinner from '../reusables/Spinner';
import EventsMonth from '../../molecules/Events/EventsMonth';
import EventsCarousel from './EventsCarousel';
import ContainerItem from '../reusables/ContainerItem';

function EventsList({
  events, populateEventsAction, fetching,
}) {
  const { Title } = Typography;
  const { errorAlert } = useSweetAlert();
  const [loading, setLoading] = useState(false);

  const [state, setState] = useState({
    byMonths: [],
  });


  useEffect(() => {
    const byMonths = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(month => ({
      month,
      events: events.events.filter(
        event => moment(event.startDate).month() === month,
      ),
    }));

    setState({
      byMonths,
    });
  }, [events.events]);

  useEffect(() => {
    if (events.events.length === 0) {
      populateEventsAction()
        .then(() => setLoading(false))
        .catch(() => {
          setLoading(false);
          errorAlert({});
        });
    }
  }, []);

  document.title = 'Eventos | Asociación Mexicana de Gastroenterología'

  return (
    <div className="dashboard-container ">
      { loading || fetching ? <Spinner fullScrren /> : null }
      
      <ContainerItem className="dash-item-center">
        <Title>Eventos</Title>
        <EventsCarousel events={events.events} />
        <div>
          {
            state.byMonths.map((month, index) => (
              <EventsMonth key={index} month={month.month} events={month.events} />
            ))
          }
        </div>
      </ContainerItem>
    </div>
  );
}


function mapStateToProps({ events }) {
  return {
    events,
    fetching: events.fetching,
  };
}

export default withRouter(connect(mapStateToProps, { populateEventsAction })(EventsList));
