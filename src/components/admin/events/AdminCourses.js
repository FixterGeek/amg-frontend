import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Typography } from 'antd';

import AdminCourseForm from './AdminCourseForm';
import ContainerItem from '../../reusables/ContainerItem';
import CourseItem from './reusables/CourseItem';

import {
  populateEventCoursesAction,
} from  '../../../store/ducks/coursesDuck';

function AdminCourses({
  courses, fetching, status,
  noCourses, match, event,
  populateEventCoursesAction,
}) {
  const { Title } = Typography;

  useEffect(() => {
    const { params } = match;
    if (courses.length === 0 && !noCourses) populateEventCoursesAction(params.id);
  }, [courses.length]);

  console.log(courses);

  return (
    <div className="admin-courses">
      <div className="header">
        <Title level={3}>Cursos</Title>
        <AdminCourseForm location={event ? event.location : null} eventId={event._id} />
      </div>

      <ContainerItem>
        {
          courses.map(course => (
            <CourseItem
              courseData={course}
            />
          ))
        }
      </ContainerItem>
    </div>
  );
}

function mapSateteToProps({ course }) {
  return {
    courses: course.array,
    noCourses: course.noData,
    fetching: course.fetching,
    status: course.status,
  }; 
}

export default withRouter(
  connect(
    mapSateteToProps, {
      populateEventCoursesAction,
    }
  )(AdminCourses)
);
