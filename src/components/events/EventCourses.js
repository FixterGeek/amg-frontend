import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { Typography } from 'antd';

import useSweet from '../../hooks/useSweetAlert';
import { enrollCourse } from '../../services/coursesServices';
import { getSelfUser } from '../../services/userServices';
import { populateEventCoursesAction } from '../../store/ducks/coursesDuck';
import ContainerItem from '../reusables/ContainerItem';
import BoxItem from '../reusables/BoxItem';
import CourseCheck from './reusables/CourseCheck';
import Button from '../reusables/Button';
import Spinner from '../reusables/Spinner';


function EventCourses({
  courses, noCourses, userId,
  populateEventCoursesAction, match: { params = {}},
  userMembership,
}) {
  const { Title } = Typography;
  const { errorAlert, successAlert } = useSweet();

  const [loading, setLoading] = useState(false);

  const [preCheckeds, setPrechckeds] = useState({
    _id: null,
    cost:{
      freeCost: 0,
      residentCost: 0,
      socioCost: 0,
    },
  });
  const [trasCheckeds, setTrasCheckeds] = useState({
    _id: null,
    cost:{
      freeCost: 0,
      residentCost: 0,
      socioCost: 0,
    },
  });

  useEffect(() => {
    if (!courses[0] && !noCourses) populateEventCoursesAction(params.id);
  }, []);

  const enroll = async () => {
    setLoading(true);
    let error = false;

    if (preCheckeds._id) await enrollCourse(preCheckeds._id)
      .catch(() => {
        error = true;
      });
    if (trasCheckeds._id) await enrollCourse(trasCheckeds._id)
      .catch(() => {
        error = true;
      });

    if (error) errorAlert({});
    if (!error) successAlert({ text: 'Te inscribiste a los cursos seleccionados' });

    setLoading(false);
  }

  return (
    <div className="dashboard-container  events-event-courses">
      { loading && <Spinner fullScrren /> }
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
              if (course.students.map(s => s.user).includes(userId) && !preCheckeds._id) setPrechckeds(c => ({ ...c, ...course }))
              return course.courseType === 'Precongreso' ? (
                <div className="events-event-courses-course" key={course._id}>
                  <BoxItem
                    noLeft
                    title={course.title}
                    subtitle={`${moment(course.startDate).format('dddd[  ]DD[ de ]MMMM')}`}
                    footer={course.location.city}
                    to={`/dashboard/eventos/${params.id}/cursos/${course._id}`}
                  />
                  <CourseCheck
                    onClick={() => setPrechckeds(c => ({...c, ...course}))}
                    checked={preCheckeds._id === course._id}
                  />
                </div>
              ) : null
            })
          }
        </ContainerItem>
      </ContainerItem>
      <ContainerItem className="dash-item-center">
        <div className="events-event-courses-header">
          <Title level={3}>Trascongreso</Title>
          <div className="number">
            { `Selecciona 1 de ${ courses.filter(c => c.type === 'Precongreso').length }` }
          </div>
        </div>
        <ContainerItem>
          {
            courses.map(course => {
              if (course.students.map(s => s.user).includes(userId) && !trasCheckeds._id) setTrasCheckeds(c => ({ ...c, ...course }))
              return course.courseType === 'Trascongreso' ? (
                <div className="events-event-courses-course" key={course._id}>
                  <BoxItem
                    noLeft
                    title={course.title}
                    subtitle={`${moment(course.startDate).format('dddd[  ]DD[ de ]MMMM')}`}
                    footer={course.location.city}
                  />
                  <CourseCheck
                    onClick={() => setTrasCheckeds(c => ({...c, ...course}))}
                    checked={trasCheckeds._id === course._id}
                  />
                </div>
              ) : null
            })
          }
        </ContainerItem>
        {
          !courses.map(c => c.students.map(u => u.user)).join().split(',').includes(userId) &&
          <div style={{ textAlign: 'center' }}>
            {
              preCheckeds.cost[userMembership] + trasCheckeds.cost[userMembership] === 0 && (preCheckeds._id || trasCheckeds._id) ?
                <Button
                  width="100%"
                  onClick={() => enroll()}
                  disabled={!preCheckeds._id && !trasCheckeds._id}
                >
                  Inscribirse
                </Button>
              : null
            }
            {
              !(preCheckeds.cost[userMembership] + trasCheckeds.cost[userMembership] === 0 && (preCheckeds._id || trasCheckeds._id))
              && (
                <Link
                  to={{
                    pathname: `/dashboard/pago/evento/${params.id}/cursos`,
                    state: [preCheckeds, trasCheckeds],
                  }}
                >
                  <Button width="100%" disabled={!preCheckeds._id && !trasCheckeds._id}>
                    Siguiente
                  </Button>
                </Link>
              )
            }
          </div>
        }
      </ContainerItem>
    </div>
  );
}

function mapSateToProps({ course, user }) {
  return {
    courses: course.array,
    noCourses: course.noData,
    fetching: course.fetching,
    status: course.status,
    userMembership: user.membershipStatus === 'Free' ? 'freeCost'
      : user.membershipStatus === 'Residente' ? 'residentCost'
      : 'socioCost',
    userId: user._id,
  };
}

export default connect(
  mapSateToProps, {
    populateEventCoursesAction,
  }
)(EventCourses);
