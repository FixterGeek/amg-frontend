import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Tabs } from 'antd';

import {
  deleteEventCourseAction,
  addOrUpdateCourseModuleAction,
} from '../../../../store/ducks/coursesDuck';
import ContainerItem from '../../../reusables/ContainerItem';
import CourseDetail from './CourseDetail';
import AdminCourseModuleForm from '../AdminCourseModuleForm';
import ModulesContent from '../../reusables/ModulesContent';

function AdminCoursesItem({
  courseData, deleteEventCourseAction,
}) {
  const { TabPane } = Tabs;

  const [currentEvent, setCurrentEvent] = useState({
    modules: [],
  });

  const updateModule = (moduleData) => {

  }

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
          <AdminCourseModuleForm event={courseData} onEvent={e => setCurrentEvent(e)} />
          <ContainerItem>
            {
              currentEvent.modules.map(module => (
                <ModulesContent
                  module={module}
                  eventId={currentEvent._id}
                  moduleForm={
                    <AdminCourseModuleForm
                      event={courseData}
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
  }
)(AdminCoursesItem);
