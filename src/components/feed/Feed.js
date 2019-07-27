/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import uniqid from 'uniqid';

import { Typography } from 'antd';

import useAmgService from '../../hooks/services/useAmgService';
import { updateEvents, createUser, updatePublications } from '../../store/actions';
import EventCover from '../../molecules/EventCover';
import PostItem from '../../molecules/PostItem';
import Publisher from '../../molecules/Publisher';
import Spinner from '../../atoms/Spinner';

function Feed(props) {
  const [loadingPost, setLoadingPost] = useState(false);
  const [loadingEvent, setLoadingEvent] = useState(false);
  const {
    events: { events },
    user,
    publications: { publications },
    dispatch,
  } = props;
  const { getEvents, getSelfUser, getPublications } = useAmgService();
  const { Title } = Typography;

  useEffect(() => {
    if (events.length === 0) {
      setLoadingEvent(true);
      getEvents().then(({ data }) => {
        dispatch(updateEvents({ events: [...data] }));
        setLoadingEvent(false);
      }).catch(({ response }) => {
        console.log(response);
        setLoadingEvent(false);
      });
    }

    if (!user.email) {
      getSelfUser().then(({ data }) => {
        dispatch(createUser({ ...data }));
      }).catch(({ response }) => {
        console.log(response);
      });
    }

    if (publications.length === 0) {
      setLoadingPost(true);
      getPublications().then(({ data }) => {
        dispatch(updatePublications({ publications: [...data] }));
        setLoadingPost(false);
      }).catch(({ response }) => {
        console.log(response);
        setLoadingPost(false);
      });
    }
  }, [
    dispatch, events.length, getEvents,
    getPublications, getSelfUser, publications.length,
    user.email,
  ]);

  return (
    <div className="dashboard-container">
      <div>
        <Title>Inicio</Title>
      </div>
      <div className="feed-event">
        { loadingEvent && (<Spinner tip="Cargando evento..." />) }
        {
          events.length > 0 && (
            <Link to={{
              pathname: `/dashboard/events/${events[0]._id}`,
              event: { ...events[0] },
            }}>
              <EventCover
                size="large"
                location={events[0].location}
                title={events[0].title}
                startDate={events[0].startDate}
                endDate={events[0].endDate}
                image={events[0].mainImagesURLS[0]} />
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
          publications.map(publication => <PostItem key={uniqid()} publication={publication} />)
        }
      </div>
    </div>
  );
}


function mapStateToProps(state) {
  return { events: state.events, user: state.user, publications: state.publications };
}

export default connect(mapStateToProps)(Feed);
