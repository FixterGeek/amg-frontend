import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Tabs } from 'antd';

import {
  deleteEventCourseAction,
  deleteCourseModuleAction,
  deleteActivityModuleAction,
  addOrUpdateActivityCourse,
} from '../../../../store/ducks/coursesDuck';
import ContainerItem from '../../../reusables/ContainerItem';
import CourseDetail from './CourseDetail';
import AdminCourseModuleForm from '../AdminCourseModuleForm';
import ModulesContent from '../../reusables/ModulesContent';

function AdminCoursesItem({
  courseData, deleteEventCourseAction,
  deleteCourseModuleAction,
  deleteActivityModuleAction,
  addOrUpdateActivityCourse,
}) {
  const { TabPane } = Tabs;

  const [currentEvent, setCurrentEvent] = useState({
    modules: [],
  });

  return (
    <div className="admin-reusables-course-data">
      <div className="header">{ courseData.title }</div>
      <Tabs type="line">
        <TabPane key="1" tab="Datos">
          <CourseDetail
            courseData={courseData}
            deleteAction={deleteEventCourseAction}
          />
        </TabPane>
        <TabPane key="2" tab="Modulos del curso">
          <AdminCourseModuleForm course={courseData} onEvent={e => setCurrentEvent(e)} />
          <ContainerItem>
            {
              currentEvent.modules.map(module => (
                <ModulesContent
                  isForCourse
                  eventSpeakers={currentEvent.speakers}
                  module={module}
                  eventId={currentEvent._id}
                  updateEventActivityAction={addOrUpdateActivityCourse}
                  removeModule={deleteCourseModuleAction}
                  removeActivity={deleteActivityModuleAction}
                  onResult={r => setCurrentEvent(c => ({ ...c, modules: c.modules.filter(m => m._id !== r._id) }))}
                  moduleForm={
                    <AdminCourseModuleForm
                      course={courseData}
                      modalOpenText="Editar módulo"
                      onActionResponse={
                        data => data && setCurrentEvent(s => ({
                          ...s, modules: s.modules.map(m => m._id === data._id ? data : m)
                        }))
                      }
                    />
                  }
                />
              ))
            }
          </ContainerItem>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default connect(
  null, {
    deleteEventCourseAction,
    deleteCourseModuleAction,
    deleteActivityModuleAction,
    addOrUpdateActivityCourse,
  }
)(AdminCoursesItem);
