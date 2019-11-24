import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import XLSX from 'xlsx-chart';

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
  removeModuleAction, deleteEventAction
}) {
  const { Title } = Typography;
  const { TabPane } = Tabs;

  const [sectionTitle, setSectionTitle] = useState('Nuevo evento')

  useEffect(() => {
    const { params = {} } = match;
    if (params.id) {
      setSectionTitle('Modificar evento');
      getSingleEvent(params.id);
    }
  }, []);

  const generateReport = () => {
    const doc = new XLSX();
    const opts = {
      file: 'report.xlsx',
      chart: 'column',
      titles: [
        "Title 1",
        "Title 2",
      ], fields: [
        'Field 1',
        'Field 2',
      ],
      data: {
        "Title 1": {
          "Field 1": 1,
        },
        "Title 2": {
          "Field 1": 1,
        }
      }
    };

    doc.writeFile(opts, (error) => {
      console.log(error);
      console.log(opts.file);
    })
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
        
        {/* <Button line marginTop="0" style={{ marginLeft: '32px' }} >
          Generar reporte de asistencia
        </Button> */}
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
            <AdminSpeakersList speakers={speakers} event={state} />
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

function mapStateToProps({ admin }) {
  return {
    state: admin.workingOn,
    speakers: admin.workingOn.speakers,
    fetching: admin.workingOn.fetching,
    modules: admin.workingOn.modules,
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
  }
)(AdminEventEdit);
