import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Parser } from 'json2csv';
import moment from 'moment';

import { Tabs, Typography, Divider, Popconfirm } from 'antd';

import {
  updateWorkingOn,
  saveDraftEvent,
  getSingleEvent,
  addSpeakerAction,
  addModuleAction,
  updateEventActivityAction,
  removeActivityAction,
  removeModuleAction,
  deleteEventAction,
} from '../../../store/ducks/adminDuck';
import { getAllUsers } from '../../../store/ducks/users';
import ContainerItem from '../../reusables/ContainerItem';
import Spinner from '../../reusables/Spinner';
import AdminEventForm from './AdminEventForm';
import AdminSpeakerForm from './AdminSpeakerForm';
import AdminSpeakersList from './AdmidSpeakersList';
import AdminEventModules from './AdminEventModules';
import AdminEventCoversForm from './AdminEvenCoversForm';
import AdminEventMap from './AdminEventMap';
import AdminCourses from './AdminCourses';
import Button from '../../reusables/Button';

function AdminEventEdit({
  match, history, state, setState,
  saveDraftEvent, getSingleEvent, addSpeakerAction,
  speakers, fetching, addModuleAction,
  modules, updateEventActivityAction, removeActivityAction,
  removeModuleAction, deleteEventAction,
  getAllUsers, users,
}) {
  const { Title } = Typography;
  const { TabPane } = Tabs;

  const [sectionTitle, setSectionTitle] = useState('Nuevo evento')

  useEffect(() => {
    const { params = {} } = match;
    if (params.id) {
      setSectionTitle('Modificar evento');
      getSingleEvent(params.id);
      getAllUsers();
    }
  }, []);


  const generateReport = () => {
    const fields = [
      { label: 'Nombre', value: 'name' },
      { label: 'Apellido paterno', value: 'dadSurname' },
      { label: 'Apellido materno', value: 'momSurname' },
      { label: 'Correo electronico', value: 'email' },
      { label: 'Membresía', value: 'membership' },
      { label: 'Especialidad', value: 'speciality' },
      { label: 'Lugar de nacimiento', value: 'place' },
      { label: 'Fecha de inscripción', value: 'createdDate' }
    ]

    

    const data = users.filter(u => state.assistants.map(a => a.user).includes(u._id))
      .map(u => {
        const date = state.assistants.filter(a => a.user === u._id)[0].date;
        return {
        name: u.basicData.name,
        dadSurname: u.basicData.dadSurname,
        momSurname: u.basicData.momSurname,
        email: u.email,
        membership: u.membershipStatus === 'Free' ? 'No socio' : u.membershipStatus === 'Residente' ? 'Socio en entrenamiento' : u.membershipStatus === 'Veterano' ? 'Emérito' : 'Socio',
        speciality: u.basicData.speciality,
        place: u.basicData.placeOfBirth.state || u.basicData.address.state,
        _id: u._id,
        createdDate: moment(Number(date)).format('dddd[ ]DD[ de ]MMMM[ de ]YYYY'),
      }})

    const jsonP = new Parser({ fields });
    const csv = jsonP.parse(data);
    
    const he = document.createElement('a');
    he.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    he.target = '_blank';
    he.download = `${state.title}_asistencia.csv`;
    he.click();
  };



  return (
    <div className="admin-event-form-container">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Title style={{ display: 'inline-block', flexGrow: 1 }}>{ sectionTitle }</Title>
        {
          state._id && (
            <Popconfirm
              okText="SI"
              cancelText="NO"
              title={`¿Eliminar ${state.title}?`}
              onConfirm={() => deleteEventAction(state._id).then(() => history.push('/admin/events'))}
            >
              <Button bgColor="red" marginTop="0" line width="200px">
                Eliminar evento
              </Button>
            </Popconfirm>
          )
        }
        
        <Button
          onClick={() => generateReport()}
          line
          marginTop="0"
          style={{ marginLeft: '32px' }}
          htmlType="button" >
          Generar reporte de asistencia
        </Button>
      </div>
      <ContainerItem style={{ position: 'relative' }}>
        { fetching && <Spinner fullScrren /> }
        <div className="event-title">
          { state.title }
        </div>
        <Tabs type="line">
          <TabPane key="1" tab="Datos Generales" style={{ position: 'relative' }}>
            <AdminEventForm
              state={state}
              setState={setState}
              saveDraftEvent={saveDraftEvent}
              history={history}
            />
          </TabPane>
          <TabPane key="2" tab="Ponentes" disabled={!state._id}>
            <AdminSpeakerForm
              speakers={speakers}
              addSpeaker={addSpeakerAction}
              eventId={state._id}
              isModal
            />
            <Divider />
            <Title level={3}>Lista de ponentes</Title>
            <AdminSpeakersList speakers={speakers} event={state} saveDraftEvent={saveDraftEvent} />
          </TabPane>
          <TabPane key="3" tab="Programa" disabled={!state._id}>
            <AdminEventModules
              addModule={addModuleAction}
              modules={modules}
              eventId={state._id}
              event={state}
              updateEventActivityAction={updateEventActivityAction}
              removeActivityAction={removeActivityAction}
              removeModuleAction={removeModuleAction}
            />
          </TabPane>
          <TabPane key="4" tab="Cursos" disabled={!state._id}>
            <AdminCourses event={state} />
          </TabPane>
          <TabPane key="5" tab="Portadas" disabled={!state._id}>
            <AdminEventCoversForm
              saveDraftEvent={saveDraftEvent}
              state={state}
              eventId={state._id}
            />
          </TabPane>
          <TabPane key="6" tab="Mapa" disabled={!state._id}>
            <AdminEventMap 
              saveDraftEvent={saveDraftEvent}
              state={state}
            />
          </TabPane>
        </Tabs>
      </ContainerItem>
    </div>
  );
}

function mapStateToProps({ admin, users }) {
  return {
    state: admin.workingOn,
    speakers: admin.workingOn.speakers,
    fetching: admin.workingOn.fetching || users.fetching,
    modules: admin.workingOn.modules,
    users: users.array,
  }
}

export default connect(
  mapStateToProps, {
    setState: updateWorkingOn,
    saveDraftEvent,
    getSingleEvent,
    addSpeakerAction,
    addModuleAction,
    updateEventActivityAction,
    removeActivityAction,
    removeModuleAction,
    deleteEventAction,
    getAllUsers,
  }
)(AdminEventEdit);
