import React from 'react';

import EventItem from '../../atoms/events/EventItem';

function ActivityItem({
  hour, title, level1, level2, to, activity,
}) {
  return (
    <div>
      <EventItem
        time={hour}
        title={title}
        level1={level1}
        level2={level2}
        to={to}
        state={activity} />
    </div>
  );
}

export default ActivityItem;
