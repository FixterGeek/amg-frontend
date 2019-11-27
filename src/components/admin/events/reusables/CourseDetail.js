import React  from 'react';
import moment from 'moment';

import { List, Button, Icon, Popconfirm, Typography } from 'antd';

import AdminCourseForm from '../AdminCourseForm';

function CourseDetail({ courseData, deleteAction }) {
  const { Item } = List;

  const {
    title, startDate, endDate,
    startTime, endTime, description,
    cost
  } = courseData;

  const Date = () => {
    const sd = moment(startDate).format('DD/MMMM/YYYY');
    const ed = moment(endDate).format('DD/MMMM/YYYY');
    const st = moment(startTime).format('hh:mm a');
    const et = moment(endTime).format('hh:mm a');

    return (
      <div className="dates">
        <span>{endDate ? `${sd} - ${ed}` : `${sd}`}</span>
        <span>{endTime ? `${st} - ${et}` : `${st}`}</span>
      </div>
    )
  };

  const handleDelete = (courseData) => {
    if (deleteAction) deleteAction(courseData);
  };

  return (
    <div className="admin-reusables-course-detail">
      <List
        itemLayout="vertical"
        size="large"
      >
        <Item actions={[
          <AdminCourseForm
            actionType="update"
            existingData={courseData}
            dataPersistence
          />,
          <Popconfirm
            title={`¿Eliminar ${title}?`}
            okText="Si"
            cancelText="No"
            onConfirm={() => handleDelete(courseData)}
          >
            <Button className="action-delete">
              Eliminar
              <Icon type="delete" />
            </Button>
          </Popconfirm>
        ]}>
          <Item.Meta
            description={<Date />}
          />
          <div>{ `Costo: ${cost || 'Sin costo'}`}</div>
          { description || null }
        </Item>
      </List>
    </div>
  );
}

export default CourseDetail;
