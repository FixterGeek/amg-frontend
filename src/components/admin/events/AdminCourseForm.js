import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Form } from 'antd';

import {
  createOrUpdateEventCourseAction
} from '../../../store/ducks/coursesDuck';
import CreateAndUpdateManager from '../reusables/CreateAndUpdateManager';
import TextField from '../../reusables/TextField';
import Button from '../../reusables/Button';

function AdminCourseForm({
  course, fetching, status,
  createOrUpdateEventCourseAction,
}) {
  const initialCourseData = {
    title: null,
  }
  const [courseData, setCourseData] = useState(initialCourseData);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setCourseData(state => ({ ...state, [name]: value }));
  }

  return (
    <div>
      <CreateAndUpdateManager 
        isModal
        payloadData={courseData}
        createAndUpdateAction={createOrUpdateEventCourseAction}
        actionType={courseData._id ? 'update' : 'create'}
        errorClose
        successClose
        status={status}
        fetching={fetching}
        onModalClose={close => close && setCourseData(initialCourseData)}
      >
        <Form>
          <TextField
            onChange={handleChange}
            value={courseData.title}
            name="title"
            label="Titulo"
          />
          <Button htmlType="submit">
            Guardar
          </Button>
        </Form>
      </CreateAndUpdateManager>
    </div>
  );
}

function mapStateToProps({ course }) {
  return {
    courses: course.array,
    fetching: course.fetching,
    status: course.status,
  }
}

export default connect(
  mapStateToProps, {
    createOrUpdateEventCourseAction,
  }
)(AdminCourseForm);
