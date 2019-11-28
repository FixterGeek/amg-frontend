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
  courses, match, event,
  populateEventCoursesAction,
}) {
  const { Title } = Typography;

  useEffect(() => {
    const { params } = match;
    populateEventCoursesAction(params.id);
  }, [courses.length]);

  return (
    <div className="admin-courses">
      <div className="header">
        <Title level={3}>Cursos</Title>
        <AdminCourseForm location={event ? event.location : null} eventId={event._id} />
      </div>

      <ContainerItem>
        <Title level={4}>Precongreso:</Title>
        {
          courses.map(course => course.courseType === 'Precongreso' ? (
            <CourseItem
              courseData={course}
            />
          ) : null)
        }
      </ContainerItem>
      <ContainerItem>
        <Title level={4}>Trascongreso:</Title>
        {
          courses.map(course => course.courseType === 'Trascongreso' ? (
            <CourseItem
              courseData={course}
            />
          ) : null)
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
