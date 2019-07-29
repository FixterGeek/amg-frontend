/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import uniqid from "uniqid";

import { Typography } from "antd";

import useAmgService from "../../hooks/services/useAmgService";
import {
  updateEvents,
  createUser,
  updatePublications
} from "../../store/actions";
import PostItem from "../../molecules/PostItem";
import Publisher from "../../molecules/Publisher";
import Spinner from "../../atoms/Spinner";
import Container from "../../atoms/layout/Container";

function UserProfileDetails(props) {
  const [loadingPost, setLoadingPost] = useState(false);
  const [loadingEvent, setLoadingEvent] = useState(false);
  const {
    events: { events },
    user,
    publications: { publications },
    dispatch
  } = props;
  const { getEvents, getSelfUser, getPublications } = useAmgService();
  const { Title } = Typography;

  useEffect(() => {
    if (events.length === 0) {
      setLoadingEvent(true);
      getEvents()
        .then(({ data }) => {
          dispatch(updateEvents({ events: [...data] }));
          setLoadingEvent(false);
        })
        .catch(({ response }) => {
          console.log(response);
          setLoadingEvent(false);
        });
    }

    if (!user.email) {
      getSelfUser()
        .then(({ data }) => {
          dispatch(createUser({ ...data }));
        })
        .catch(({ response }) => {
          console.log(response);
        });
    }

    if (publications.length === 0) {
      setLoadingPost(true);
      getPublications()
        .then(({ data }) => {
          dispatch(updatePublications({ publications: [...data] }));
          setLoadingPost(false);
        })
        .catch(({ response }) => {
          console.log(response);
          setLoadingPost(false);
        });
    }
  }, []);

  console.log(user);

  return (
    <div className="dashboard-container">
      <div>
        <Title>
          {user.basicData.name} {user.basicData.dadSurname}{" "}
          {user.basicData.momSurname}
        </Title>
      </div>
      <Container alignItems="flex-start" paddingTop="20px" paddingBottom="10px">
        <div className="mask">
          <img
            src={user.basicData.photoURL}
            alt={user.basicData.name}
            className="avatar"
          />
        </div>
        <div className="user-info-text">
          <p className="partner-type">{user.userStatus}</p>
          <p className="specialty-name">{user.basicData.speciality}</p>
          <p className="address-name">{user.address.addressName}</p>
          <Container
            bgColor="#f5f8f9"
            width="50%"
            height="65px"
            justifyContent="space-around"
          >
            <div className="follow-info">
              <p className="follow">Te siguen</p>
              <p className="follow-number">101</p>
            </div>
            <div className="follow-info">
              <p className="follow"> Sigues</p>
              <p className="follow-number">68</p>
            </div>
          </Container>
        </div>
      </Container>

      {/* <div className="feed-event">
        {loadingEvent && <Spinner tip="Cargando evento..." />}
        {events.length > 0 && (
          <Link
            to={{
              pathname: `/dashboard/events/${events[2]._id}`,
              event: { ...events[2] }
            }}
          >
            <EventCover
              size="large"
              location={events[2].location}
              title={events[2].title}
              startDate={events[2].startDate}
              endDate={events[2].endDate}
              image={events[2].photoURL}
            />
          </Link>
        )}
      </div> */}
      <div>
        <Publisher />
      </div>
      <div className="feed-publications">
        {loadingPost && <Spinner tip="Cargando publicaciones..." />}
        {publications.map(publication => (
          <PostItem key={uniqid()} publication={publication} />
        ))}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    events: state.events,
    user: state.user,
    publications: state.publications
  };
}

export default connect(mapStateToProps)(UserProfileDetails);
