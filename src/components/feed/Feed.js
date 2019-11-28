/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import { Typography } from 'antd';

import useSweetAlert from '../../hooks/useSweetAlert';
import { populateEventsAction } from '../../store/ducks/eventsDuck';
import {
  populatePublicationsAction,
  deletePublication,
} from '../../store/ducks/publicationsDuck';
import EventCover from '../../molecules/EventCover';
import PostItem from './reusables/PostItem';
import Publisher from './Publisher';
import Spinner from '../reusables/Spinner';
import AmgFinder from './FeedAmgFinder';
import ContainerItem from '../reusables/ContainerItem';

function Feed({
  events, publications, populateEventsAction,
  populatePublicationsAction, user, history,
  fetching, deletePublication,
}) {
  const { Title } = Typography;

  const { errorAlert, infoAlert } = useSweetAlert();
  const [lastEvent, setLastEvent] = useState({ _id: null });
  const { publications: pubs } = publications;


  useEffect(() => {
    if (events.length > 0) {
      const sorted = events.sort((a, b) => moment(b.startDate).diff(moment(a.startDate)));
      setLastEvent(sorted[0]);
    }
  }, [events.length]);

  useEffect(() => {
    if (user.membershipStatus === 'Free') {
      infoAlert({ text: 'Sección de publicaciones disponible para usuarios con membresía.' });
      history.push('/dashboard/events')
    }
  }, [user]);

  useEffect(() => {
    populateEventsAction()
      .catch(() => {
        errorAlert();
      });
  }, []);

  useEffect(() => {
    populatePublicationsAction()
      .catch(() => errorAlert());
  }, []);

  document.title = 'Inicio | Asociación Mexicana de Gastroenterología'

  return (
    <div className="dashboard-container">
      <ContainerItem className="dash-item-center">
          <Title>Inicio</Title>
        <AmgFinder />
        <div className="feed-event">
          { fetching && (<Spinner fullScrren />) }
          {
            lastEvent._id && (
              <Link to={{
                pathname: `/dashboard/eventos/${lastEvent._id}`,
                event: { ...lastEvent },
              }}>
                <EventCover
                  size="large"
                  location={lastEvent.location}
                  title={lastEvent.title}
                  startDate={lastEvent.startDate}
                  endDate={lastEvent.endDate}
                  image={lastEvent.mainImagesURLS[0]} />
              </Link>
            )
          }
        </div>
        <div>
          <Publisher />
        </div>
        <div className="feed-publications">
          {
            pubs.map(publication => <PostItem
              key={publication._id}
              publication={publication}
              user={user._id}
              deleteDispatch={deletePublication}
            />)
          }
        </div>
      </ContainerItem>
    </div>
  );
}


function mapStateToProps({ events, user, publications }) {
  return {
    events: events.array.filter(e => e.status === 'published'),
    user,
    publications,
    fetching: publications.fetching || events.fetching,
  };
}

export default connect(
  mapStateToProps, {
    populateEventsAction,
    populatePublicationsAction,
    deletePublication,
  },
)(Feed);
