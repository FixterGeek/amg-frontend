/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

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

function Feed({
  events, publications, populateEventsAction,
  populatePublicationsAction, user, history,
  fetching, deletePublication,
}) {
  const { Title } = Typography;

  const { errorAlert, infoAlert } = useSweetAlert();
  const [loadingPost, setLoadingPost] = useState(false);
  const [loadingEvent, setLoadingEvent] = useState(false);
  const [lastEvent, setLastEvent] = useState({ _id: null });
  const { events: eventsList } = events;
  const { publications: pubs } = publications;


  useEffect(() => {
    if (eventsList.length > 0) setLastEvent(eventsList.reverse().pop());
  }, [eventsList.length]);

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

  console.log(fetching);

  return (
    <div className="dashboard-container">
      <div>
        <Title>Inicio</Title>
      </div>
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
        { loadingPost && (<Spinner tip="Cargando publicaciones..." />) }
        {
          pubs.map(publication => <PostItem
            key={publication._id}
            publication={publication}
            user={user._id}
            deleteDispatch={deletePublication}
          />)
        }
      </div>
    </div>
  );
}


function mapStateToProps({ events, user, publications }) {
  return {
    events,
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
