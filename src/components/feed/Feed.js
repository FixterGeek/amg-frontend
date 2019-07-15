/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Typography } from 'antd';

import useAmgService from '../../hooks/services/useAmgService';
import { updateEvents, createUser } from '../../store/actions';
import EventCover from '../../molecules/EventCover';
import PostItem from '../../molecules/PostItem';
import Publisher from '../../molecules/Publisher';

function Feed(props) {
  console.log(props);
  const { events: { events }, user, dispatch } = props;
  const { getEvents, getSelfUser } = useAmgService();
  const { Title } = Typography;

  useEffect(() => {
    if (events.length === 0) {
      getEvents().then(({ data }) => dispatch(updateEvents({ events: [...data] })));
      // dispatch(updateEvents());
    }

    if (!user.email) {
      getSelfUser().then(({ data }) => {
        dispatch(createUser({ ...data }));
      }).catch(({ response }) => {
        console.log(response);
      });
    }
  }, []);

  console.log(user);

  return (
    <div className="dashboard-container">
      <div>
        <Title>Inicio</Title>
      </div>
      <div>
        {
          events.length > 0 && (
            <Link to={{
              pathname: `/dashboard/events/${events[2]._id}`,
              event: { ...events[2] },
            }}>
              <EventCover
                size="large"
                location={events[2].location}
                title={events[2].title}
                startDate={events[2].startDate}
                endDate={events[2].endDate}
                image={events[2].photoURL} />
            </Link>
          )
        }
      </div>
      <div>
        <Publisher />
      </div>
      <div>
        <PostItem />
        <PostItem />
      </div>
    </div>
  );
}


function mapStateToProps(state) {
  return { events: state.events, user: state.user };
}

export default connect(mapStateToProps)(Feed);
