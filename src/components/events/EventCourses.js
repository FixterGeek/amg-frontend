import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'; 

import { Typography } from 'antd';

import { populateEventCoursesAction } from '../../store/ducks/coursesDuck';
import ContainerItem from '../reusables/ContainerItem';
import BoxItem from '../reusables/BoxItem';
import CourseCheck from './reusables/CourseCheck';
import Button from '../reusables/Button';

function EventCourses({
  courses, noCourses, fetching, status,
  populateEventCoursesAction, match: { params = {}},
}) {
  const { Title } = Typography;

  const [preCheckeds, setPrechckeds] = useState([]);
  const [trasCheckeds, setTrasCheckeds] = useState([]);

  useEffect(() => {
    if (!courses[0] && !noCourses) populateEventCoursesAction();
  }, []);

  const handleChecked = ({ target }, courseType) => {
    const { checked, course } = target;

    if (courseType === 'pre') {
      if (checked) setPrechckeds(state => [ ...state, course ])
      if (!checked) setPrechckeds(state => state.filter(item => item._id !== course._id))
    }

    if (courseType === 'tras') {
      if (checked) setTrasCheckeds(state => [ ...state, course ])
      if (!checked) setTrasCheckeds(state => state.filter(item => item._id !== course._id))
    }
  };


  return (
    <div className="dashboard-container  events-event-courses">
      <ContainerItem className="dash-item-center">
        <Title>Cursos</Title>
        <div className="events-event-courses-header">
          <Title level={3}>Precongreso</Title>
          <div className="number">
            { `Selecciona 1 de ${ courses.filter(c => c.type === 'Precongreso').length }` }
          </div>
        </div>
        <ContainerItem>
          {
            courses.map(course => {
              return course.type === 'Precongreso' ? (
                <div className="events-event-courses-course" key={course._id}>
                  <BoxItem
                    noLeft
                    title={course.title}
                    subtitle={course.startDate}
                    footer={course.location.city}
                    to={`/dashboard/eventos/${params.id}/cursos/${course._id}`}
                  />
                  <CourseCheck
                    onChecked={
                      checked => handleChecked({target: { checked, course } }, 'pre')
                    }
                  />
                </div>
              ) : null
            })
          }
        </ContainerItem>
      </ContainerItem>
      <ContainerItem className="dash-item-center">
        <div className="events-event-courses-header">
          <Title level={3}>Precongreso</Title>
          <div className="number">
            { `Selecciona 1 de ${ courses.filter(c => c.type === 'Precongreso').length }` }
          </div>
        </div>
        <ContainerItem>
          {
            courses.map(course => {
              return course.type === 'Trascongreso' ? (
                <div className="events-event-courses-course" key={course._id}>
                  <BoxItem
                    noLeft
                    title={course.title}
                    subtitle={course.startDate}
                    footer={course.location.city}
                  />
                  <CourseCheck
                    onChecked={
                      checked => handleChecked({target: { checked, course } }, 'tras')
                    }
                  />
                </div>
              ) : null
            })
          }
        </ContainerItem>
        <div style={{ textAlign: 'center' }}>
          <Link
            to={{
              pathname: `/dashboard/pago/evento/${params.id}/cursos`,
              state: [...preCheckeds, ...trasCheckeds],
            }}
          >
            <Button width="100%" disabled={!preCheckeds[0] && !trasCheckeds[0]}>
              Siguiente
            </Button>
          </Link>
        </div>
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
