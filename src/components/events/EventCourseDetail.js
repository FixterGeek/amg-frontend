import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { Typography } from 'antd';

import { populateEventCoursesAction } from '../../store/ducks/coursesDuck';
import ContainerItem from '../reusables/ContainerItem';
import Spinner from '../reusables/Spinner';
import BoxItem from '../reusables/BoxItem';

function EventCourseDetail({
  courses, match, populateEventCoursesAction,
  courseFetching,
}) {
  const { Title } = Typography;
  const { params } = match;

  const [course, setCourse] = useState({ modules: [] });

  useEffect(() => {
    const currentCourse = courses.filter(c => c._id === params.courseId);
    console.log(currentCourse);
    if (currentCourse.length === 0) populateEventCoursesAction(params.eventId);
    else setCourse(state => ({...state, ...currentCourse[0]}));
  }, [params.eventId, params.courseId, courses.length]);

  return (
    <div className="dashboard-container  events-event-courses-detail">
      { courseFetching && <Spinner fullScrren /> }
      <ContainerItem className="dash-item-center">
        <Title>{`${course.title || ''}`}</Title>
        <ContainerItem>
          {
            course.modules.map(module => {
              console.log(typeof module);
              if (typeof module === 'string') return null
              return (
                <ContainerItem> 
                  <Title>{module.title}</Title>
                  {
                    module.activities.map(activity => (
                      <BoxItem
                        leftContent={
                          `${moment(activity.startTime).format('hh a')} - ${moment(activity.endTime).format('hh a')}`
                        }
                        title={activity.title}
                        subtitle={activity.description}
                        footer={moment(activity.date).format('dddd DD[ de ] MMMM')}
                      />
                    ))
                  }
                </ContainerItem>
              )
            })
          }
        </ContainerItem>
      </ContainerItem>
    </div>
  );
}

function mapSateToProps({ course, events }) {
  return {
    courses: course.array,
    courseFetching: course.fetching,
    events: events.array,
  };
}

export default connect(
  mapSateToProps, {
    populateEventCoursesAction
  }
)(EventCourseDetail);
