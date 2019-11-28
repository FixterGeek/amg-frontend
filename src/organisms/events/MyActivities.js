import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { Typography } from 'antd';

import DashboardContainerItem from '../../atoms/DashboardContainerItem';
import ActivityItem from '../../molecules/Events/ActivityItem';
import useAmgService from '../../hooks/services/useAmgService';

function MyActivities({ user }) {
  const [activities, setActivities] = useState([]);
  const { getActivitiesForUser } = useAmgService();
  const { Title } = Typography;

  // const getLocalActivity = activityId => activitiesState.filter(activity => activity._id === activityId);

  useEffect(() => {
    if (!activities[0] && user._id) {
      getActivitiesForUser(user._id).then(({ data }) => {
        setActivities({ ...data });
      }).catch(({ response }) => response);
    }
  }, []);

  return (
    <DashboardContainerItem>
      <div>
        <Title level={3}>Mis actividades</Title>
      </div>
      {
        activities.map((activity) => {
          return (
            <ActivityItem
              hour={moment(activity.date).format('dddd DD [de] MM')}
              title={activity.title}
              activity={activity} />
          );
        })
      }
    </DashboardContainerItem>
  );
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(MyActivities);
