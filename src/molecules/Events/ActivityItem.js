import React from 'react';

import EventItem from '../../atoms/events/EventItem';

function ActivityItem({
  hour, title, level1, level2, to, activity, className,hour2
}) {
  return (
    <div>
      <EventItem
        className={`${className}`}
        time={hour}
        hour2={hour2}
        title={title}
        level1={level1}
        level2={level2}
        to={to}
        state={activity} />
    </div>
  );
}

export default ActivityItem;
