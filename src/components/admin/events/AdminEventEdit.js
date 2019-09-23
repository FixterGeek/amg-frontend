import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { Tabs, Typography, Divider } from 'antd';

import {
  updateWorkingOn,
  saveDraftEvent,
  getSingleEvent,
  addSpeakerAction
} from '../../../store/ducks/adminDuck';
import ContainerItem from '../../reusables/ContainerItem';
import Spinner from '../../reusables/Spinner';
import AdminEventForm from './AdminEventForm';
import AdminSpeakerForm from './AdminSpeakerForm';
import AdminSpeakersList from './AdmidSpeakersList';
import AdminEventMap from './AdminEventMap';

function AdminEventEdit({
  match, state,setState,
  saveDraftEvent, getSingleEvent, addSpeakerAction,
  speakers, fetching,
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
          <TabPane key="2" tab="Ponentes">
            <AdminSpeakerForm
              speakers={speakers}
              addSpeaker={addSpeakerAction}
              eventId={state._id}
            />
            <Divider />
            <Title level={3}>Lista de ponentes</Title>
            <AdminSpeakersList speakers={speakers} />
          </TabPane>
          <TabPane key="3" tab="Modulos">
            modulos
          </TabPane>
          <TabPane key="4" tab="Portadas">
            modulos
          </TabPane>
          <TabPane key="5" tab="Mapa">
            <AdminEventMap />
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
  }
}

export default connect(
  mapStateToProps, {
    setState: updateWorkingOn,
    saveDraftEvent,
    getSingleEvent,
    addSpeakerAction,
  }
)(AdminEventEdit);
