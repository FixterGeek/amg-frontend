import React from 'react';

import { Tabs } from 'antd';

import CourseDetail from './CourseDetail';

function AdminCoursesItem({
  courseData
}) {
  const { TabPane } = Tabs;

  console.log(courseData);

  return (
    <div className="admin-reusables-course-data">
      <div className="header">{ courseData.title }</div>
      <Tabs type="line">
        <TabPane key="1" tab="Datos">
          <CourseDetail
            courseData={courseData}
          />
        </TabPane>
        <TabPane key="2" tab="Modulos del curso">
          ok
        </TabPane>
      </Tabs>
    </div>
  );
}

export default AdminCoursesItem;
