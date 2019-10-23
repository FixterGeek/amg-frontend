import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Form } from 'antd';

import { getSingleCourse } from '../../../services/coursesServices';
import {
  addOrUpdateCourseModuleAction,
} from '../../../store/ducks/coursesDuck';
import CreateAndUpdateManager from '../reusables/CreateAndUpdateManager';
import TextField from '../../reusables/TextField';
import TextAreaField from '../../reusables/TextAreaField';
import DatePickerField from '../../reusables/DatePickerField';
import Button from '../../reusables/Button';
import Spinner from '../../reusables/Spinner';

function AdminCourseModuleForm({
  fetching, status, match: { params },
  existingData, course, dataPersistence,
  addOrUpdateCourseModuleAction,
  onEvent, modalOpenText, onActionResponse,
}) {
  const initalData = {
    course: course._id,
    title: null,
    description: null,
    date: null,
  };

  const [moduleData, setModuleData] = useState(existingData || initalData);
  const [eventIsLoading, setEventIsLoading] = useState(false);

  useEffect(() => {
    if (!eventIsLoading) {
      getSingleCourse(course._id).then(courseData => {
        if (onEvent) onEvent(courseData);
        setEventIsLoading(true);
      });
    }
  }, [eventIsLoading])

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setModuleData(s => ({ ...s, [name]: value }));
  }

  return (
    <div>
      {!eventIsLoading && <Spinner fullScrren />}
      <CreateAndUpdateManager
        createAndUpdateAction={addOrUpdateCourseModuleAction}
        isModal
        fetching={fetching}
        status={status}
        successClose
        errorClose
        payloadData={moduleData}
        modalOpenText={modalOpenText || 'Agregar módulo ✚'}
        onModalClose={close => close && !dataPersistence ? setModuleData(initalData) : null}
        actionType={params.id}
        onActionResponse={r => onActionResponse ? onActionResponse(r) : setEventIsLoading(false)}
      >
        <Form>
          <TextField
            onChange={handleChange}
            value={moduleData.title}
            name="title"
            label="Título"
          />
          <TextAreaField
            onChange={handleChange}
            value={moduleData.description}
            name="description"
            label="Descripción"
          />
          <DatePickerField
            onChange={m => handleChange({ target: { name: 'date', value: m.toString() }})}
            value={moduleData.date}
            label="Fecha"
          />
          <Button width="100%" htmlType="submit">
            { moduleData._id ? 'Actualizar' : 'Guardar' }
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
  };
}

export default withRouter(
  connect(
  mapStateToProps, {
    addOrUpdateCourseModuleAction
  }
)(AdminCourseModuleForm));
