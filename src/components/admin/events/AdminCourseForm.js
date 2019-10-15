import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Form, Button as AntButton, Icon, Radio } from 'antd';

import { createOrUpdateEventCourseAction } from '../../../store/ducks/coursesDuck';
import CreateAndUpdateManager from '../reusables/CreateAndUpdateManager';
import TextField from '../../reusables/TextField';
import TextAreaField from '../../reusables/TextAreaField';
import TimePickerField from '../../reusables/TimePickerField';
import Button from '../../reusables/Button';
import RangeDatePicker from '../../reusables/RangeDatePicker';
import SelectField, { OptionSelect } from '../../reusables/SelectField';

import estados from '../estados.json';

function AdminCourseForm({
  course, fetching, status,
  createOrUpdateEventCourseAction,
  existingData, actionType = 'create',
  location = {}, eventId, dataPersistence,
}) {
  const initialCourseData = {
    type: 'Precongreso',
    title: null,
    description: [],
    startDate: null,
    endDate: null,
    startTime: null,
    endTime: null,
    location: {
      type: 'Course',
      state: location.state || null,
      street: location.street || null,
      city: location.city || null,
      zipCode: location.zipCode || null,
      addressName: eventId,
    },
    status: 'draft',
    speakers: [],
    mainImagesURLS: [],
    permisosURLS: [],
  }

  const [courseData, setCourseData] = useState(existingData || initialCourseData);

  useEffect(() => {
    console.log(existingData);
    if (existingData) setCourseData(state => ({ ...state, ...existingData }))
  }, [existingData])

  const handleChange = ({ target }, sub) => {
    const { name, value } = target;
    if (name === 'dates') return setCourseData(
      state => ({ ...state, startDate: value[0].toString(), endDate: value[0].toString() })
    )
    if (name === 'description') return setCourseData(s => ({ ...s, description: [value] }))
    if (sub) return setCourseData(state => ({ ...state, [sub]: { ...state[sub], [name]: value } }))

    setCourseData(state => ({ ...state, [name]: value }));
  }

  console.log(courseData);

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
        onModalClose={close => close && !dataPersistence ? setCourseData(initialCourseData) : null}
        modalOpenText="Agregar curso ✚"
        openModalElement={actionType === 'update' ? (
          <AntButton className="action-edit">
            Modificar
            <Icon type="edit" />
          </AntButton>
        ) : null}
      >
        <Form>
          <Form.Item label="Tipo de curso" style={{ fontWeight: 'bold' }}>
            <Radio.Group onChange={handleChange} value={courseData.type}  name="type" style={{ fontWeight: 'normal' }}>
              <Radio value="Precongreso">Precongreso</Radio>
              <Radio value="Trascongreso">Trascongreso</Radio>
            </Radio.Group>
          </Form.Item>
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
          <TextField
            onChange={e => handleChange(e, 'location')}
            value={courseData.location.street}
            name="street"
            label="Dirección"
          />
          <TextField
            onChange={e => handleChange(e, 'location')}
            value={courseData.location.city}
            name="city"
            label="Ciudad"
          />
          <TextField
            onChange={e => handleChange(e, 'location')}
            value={courseData.location.zipCode}
            name="zipCode"
            label="Código postal"
          />
          <SelectField
            onChange={value => handleChange({ target: { name: 'state', value } }, 'location')}
            value={courseData.location.state}
            label="Estado"
          >
            {
              Object.keys(estados).map(key => (
                <OptionSelect key={key} value={estados[key]}>
                  { estados[key] }
                </OptionSelect>
              ))
            }
          </SelectField>

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
