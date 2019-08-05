import React from 'react';
import moment from 'moment';

import { Typography } from 'antd';

import DashboardContainerItem from '../../atoms/DashboardContainerItem';
import ActivityItem from './ActivityItem';

function ActivitiesList({ event, getLocalActivity}) {
  const { Title } = Typography;
  return (
    <DashboardContainerItem>
      {
        event.program.map((module) => {
          return (
            <DashboardContainerItem key={module._id}>
              <Title level={3} style={{ marginTop: '32px', marginBottom: '32px' }}>
                { module.title }
              </Title>
              <div>
                {
                  module.activities.map((activityId) => {
                    const activity = getLocalActivity(activityId)[0];
                    console.log(activity);
                    return (
                      <ActivityItem
                        key={activity._id}
                        hour={moment(activity.date).format('hh:mm a')}
                        title={activity.activityName}
                        level1={activity.speaker.fullName}
                        level2={activity.location.addressName}
                        to={`/dashboard/events/${event._id}/program/${activity._id}`}
                        activity={activity} />
                    );
                  })
                }
              </div>
            </DashboardContainerItem>
          );
        })
      }
    </DashboardContainerItem>
  );
}

export default ActivitiesList;
