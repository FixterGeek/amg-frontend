import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Tabs, Typography, Divider } from 'antd';

import {
  updateWorkingOn,
  saveDraftEvent,
  getSingleEvent,
  addSpeakerAction,
  addModuleAction,
  updateEventActivityAction,
  removeActivityAction,
  removeModuleAction,
} from '../../../store/ducks/adminDuck';
import ContainerItem from '../../reusables/ContainerItem';
import Spinner from '../../reusables/Spinner';
import AdminEventForm from './AdminEventForm';
import AdminSpeakerForm from './AdminSpeakerForm';
import AdminSpeakersList from './AdmidSpeakersList';
import AdminEventModules from './AdminEventModules';
import AdminEventCoversForm from './AdminEvenCoversForm';
import AdminEventMap from './AdminEventMap';

function AdminEventEdit({
  match, state,setState,
  saveDraftEvent, getSingleEvent, addSpeakerAction,
  speakers, fetching, addModuleAction,
  modules, updateEventActivityAction, removeActivityAction,
  removeModuleAction,
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

  return (
    <div className="admin-event-form-container">
      <Title>{ sectionTitle }</Title>
      <ContainerItem style={{ position: 'relative' }}>
        { fetching && <Spinner /> }
        <Tabs type="line">
          <TabPane key="1" tab="Datos Generales" style={{ position: 'relative' }}>
            <AdminEventForm
              state={state}
              setState={setState}
              saveDraftEvent={saveDraftEvent}
            />
          </TabPane>
          <TabPane key="2" tab="Ponentes" disabled={!state._id}>
            <AdminSpeakerForm
              speakers={speakers}
              addSpeaker={addSpeakerAction}
              eventId={state._id}
            />
            <Divider />
            <Title level={3}>Lista de ponentes</Title>
            <AdminSpeakersList speakers={speakers} />
          </TabPane>
          <TabPane key="3" tab="Módulos" disabled={!state._id}>
            <AdminEventModules
              addModule={addModuleAction}
              modules={modules}
              eventId={state._id}
              updateEventActivityAction={updateEventActivityAction}
              removeActivityAction={removeActivityAction}
              removeModuleAction={removeModuleAction}
            />
          </TabPane>
          <TabPane key="4" tab="Portadas" disabled={!state._id}>
            <AdminEventCoversForm
              saveDraftEvent={saveDraftEvent}
              state={state}
            />
          </TabPane>
          <TabPane key="5" tab="Mapa" disabled={!state._id}>
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
  }
)(AdminEventEdit);
