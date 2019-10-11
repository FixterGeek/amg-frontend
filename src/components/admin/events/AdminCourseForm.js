import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Form, Button as AntButton, Icon } from 'antd';

import {
  createOrUpdateEventCourseAction
} from '../../../store/ducks/coursesDuck';
import CreateAndUpdateManager from '../reusables/CreateAndUpdateManager';
import TextField from '../../reusables/TextField';
import TextAreaField from '../../reusables/TextAreaField';
import TimePickerField from '../../reusables/TimePickerField';
import Button from '../../reusables/Button';
import RangeDatePicker from '../../reusables/RangeDatePicker';

function AdminCourseForm({
  course, fetching, status,
  createOrUpdateEventCourseAction,
  existingData = {}, actionType = 'create'
}) {
  const initialCourseData = {
    title: null,
    description: null,
    startDate: null,
    endDate: null,
    startTime: null,
    entTime: null,
  }
  const [courseData, setCourseData] = useState(existingData || initialCourseData);

  useEffect(() => {
    if (existingData._id) setCourseData(state => ({ ...state, ...existingData }))
  }, [existingData._id])

  const handleChange = ({ target }) => {
    const { name, value } = target;
    if (name === 'dates') return setCourseData(
      state => ({ ...state, startDate: value[0].toString(), endDate: value[0].toString })
    )

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
        modalOpenText="Agregar curso ✚"
        openModalElement={actionType === 'update' ? (
          <AntButton className="action-edit">
            Modificar
            <Icon type="edit" />
          </AntButton>
        ) : null}
      >
        <Form>
          <TextField
            onChange={handleChange}
            value={courseData.title}
            name="title"
            label="Titulo"
          />
          <TextAreaField
            onChange={handleChange}
            value={courseData.description}
            name="description"
            label="Descripción"
          />
          <RangeDatePicker
            onChange={m => handleChange({ target: { name: 'dates' , value: m} })}
            values={[courseData.startDate, courseData.endDate]}
            label="Fechas"
          />
          <TimePickerField
            onChange={t => handleChange({ target: { name: 'startTime', value: t.toString() } })}
            value={courseData.startTime}
            label="Hora de inicio"
          />
          <TimePickerField
            onChange={t => handleChange({ target: { name: 'endTime', value: t.toString() } })}
            value={courseData.endTime}
            label="Hora de termino"
          />

          <Button htmlType="submit" width="100%">
            { actionType === 'create' ? 'Guardar' : 'Actualizar' }
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
