import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Typography } from 'antd';

import { populateEventCoursesAction } from '../../store/ducks/coursesDuck';
import ContainerItem from '../reusables/ContainerItem';
import BoxItem from '../reusables/BoxItem';

function EventCourses({
  courses, noCourses, fetching, status,
  populateEventCoursesAction,
}) {
  const { Title } = Typography;

  useEffect(() => {
    if (!courses[0] && !noCourses) populateEventCoursesAction();
  }, []);

  return (
    <div className="dashboard-container">
      <Title>Cursos</Title>
      <ContainerItem>
        <Title level={3}>Precongreso</Title>
        <div>
          {
            courses.map(course => {
              return course.type === 'Precongreso' ? (
                <div>
                  <BoxItem
                    noLeft
                    title={course.title}
                    subtitle={course.startDate}
                    footer={course.location.city}
                  />
                </div>
              ) : null
            })
          }
        </div>
      </ContainerItem>
      <ContainerItem>
        <Title level={3}>Trascongreso</Title>
      </ContainerItem>
    </div>
  );
}

function mapSateToProps({ course }) {
  return {
    courses: course.array,
    noCourses: course.noData,
    fetching: course.fetching,
    status: course.status
  };
}

export default connect(
  mapSateToProps, {
    populateEventCoursesAction,
  }
)(EventCourses);
