import React from 'react';

import { Table, Typography, List, Button, Icon } from 'antd';

import ContainerItem from '../../reusables/ContainerItem';
import JustModal from '../reusables/JustMoadal';
import AdminActivityForm from '../events/AdminActivityForm';
import SpeakersAddList from '../events/AdminSpeakersAddList';
import AmgButton from '../../reusables/Button';

function ModulesContent({
  module, eventId, updateEventActivityAction,
  removeActivity, removeModule
}) {
  const { Title } = Typography;
  const { activities = [] } = module;

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'activityName'
    },
    {
      title: 'Tipo de actividad',
      dataIndex: 'activityType',
    },
    {
      title: 'Número de asistentes',
      render: (text, record) => (
        <span>{ record.assistants.length }</span>
      )
    },
    {
      title: 'Ponentes',
      render: (text, record) => {
        return (
          <div>
            <JustModal
              childElement={
                <SpeakersAddList onSpeakers={speakersArray => updateSpeakers(speakersArray, record)} />
              }
              openComponent={(
                <Button type="link">
                  Agregar ponente ✚
                </Button>
              )}
            />
            <List>
              {record.speakers.map(speaker => (
                <List.Item>
                  { speaker.fullName }
                  <Icon type="delete" onClick={() => deleteSpeakers(record, speaker)} />
                </List.Item>
              ))}
            </List>
          </div>
        )
      }
    },
    {
      title: 'Acciones',
      render: (text, record) => {
        return (
          <div>
            <Icon type="delete" onClick={() => removeActivity(record)} />
            <JustModal
              openComponent={<Icon type="edit" />}
              childElement={
                <AdminActivityForm
                  module={module}
                  eventId={eventId}
                  externalData={record}
                />
              }
            />
          </div>
        )
      }
    }
  ];

  const updateSpeakers = (speakersArray, activity) => {
    const currentActivity = { ...activity };
    currentActivity.speakers = speakersArray;
    updateEventActivityAction(currentActivity._id, currentActivity);
  }

  const deleteSpeakers = (activity, speaker) => {
    const currentActivity = { ...activity };
    const noDeteleteSpeakers = activity.speakers.filter(spkr => spkr._id !== speaker._id );
    currentActivity.speakers = noDeteleteSpeakers;
    updateEventActivityAction(currentActivity._id, currentActivity);
  }

  return (
    <ContainerItem className="admin-reusables-modules-content">
      <Title level={4}>{ `Módulo: ${module.title}` }</Title>
      <div className="admin-reusables-modules-content-main-buttons">
        <JustModal
          buttonText="Agregar actividad ✚"
          childElement={
            <AdminActivityForm
              module={module}
              eventId={eventId}
            />
          }
        />
        <AmgButton
          onClick={() => removeModule(module)}
          width="200px"
          marginTop="0px"
          bgColor="red" >
          Eliminar módulo
        </AmgButton>
        <JustModal
          openComponent={(
            <AmgButton width="200px" marginTop="0px" bgColor="yellow">
              Editar módulo
            </AmgButton>
          )}
        />
      </div>
      <Table dataSource={activities} columns={columns} rowKey="_id" />
    </ContainerItem>
  );
}

export default ModulesContent;
