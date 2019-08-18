/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Typography } from 'antd';

import useSweetAlert from '../../hooks/useSweetAlert';
import { populateEventsAction } from '../../store/ducks/eventsDuck';
import { populatePublicationsAction } from '../../store/ducks/publicationsDuck';
import EventCover from '../../molecules/EventCover';
import PostItem from '../../molecules/PostItem';
import Publisher from '../../molecules/Publisher';
import Spinner from '../../atoms/Spinner';

function Feed({
  events, publications, populateEventsAction, populatePublicationsAction, user, history
}) {
  const { Title } = Typography;

  const { errorAlert, infoAlert } = useSweetAlert();
  const [loadingPost, setLoadingPost] = useState(false);
  const [loadingEvent, setLoadingEvent] = useState(false);
  const { events: eventsList } = events;
  const { publications: pubs } = publications;


  useEffect(() => {
    if (user.membershipStatus === 'Free') {
      infoAlert({ text: 'No cuentas con los privilegios para acceder al Feed' });
      history.push('/dashboard/events')
    }
  }, [user]);

  useEffect(() => {
    setLoadingEvent(true);
    populateEventsAction()
      .then(() => setLoadingEvent(false))
      .catch(() => {
        setLoadingEvent(false);
        errorAlert();
      });
  }, []);

  useEffect(() => {
    setLoadingPost(true);
    populatePublicationsAction()
      .then(() => setLoadingPost(false))
      .catch(() => errorAlert());
  }, []);


  return (
    <div className="dashboard-container">
      <div>
        <Title>Inicio</Title>
      </div>
      <div className="feed-event">
        { loadingEvent && (<Spinner tip="Cargando evento..." />) }
        {
          eventsList.length > 0 && (
            <Link to={{
              pathname: `/dashboard/events/${eventsList[0]._id}`,
              event: { ...eventsList[0] },
            }}>
              <EventCover
                size="large"
                location={eventsList[0].location}
                title={eventsList[0].title}
                startDate={eventsList[0].startDate}
                endDate={eventsList[0].endDate}
                image={eventsList[0].mainImagesURLS[0]} />
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
          pubs.map(publication => <PostItem key={publication._id} publication={publication} />)
        }
      </div>
    </div>
  );
}


function mapStateToProps(state) {
  return { events: state.events, user: state.user, publications: state.publications };
}

export default connect(
  mapStateToProps,
  { populateEventsAction, populatePublicationsAction },
)(Feed);
