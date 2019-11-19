import React, { useState } from 'react';

import { Table, Typography, List, Button, Icon, Popconfirm } from 'antd';

import ContainerItem from '../../reusables/ContainerItem';
import JustModal from '../reusables/JustMoadal';
import AdminActivityForm from '../events/AdminActivityForm';
import AdminModuleForm from '../events/AdminModuleForm';
import SpeakersAddList from '../events/AdminSpeakersAddList';
import AmgButton from '../../reusables/Button';

function ModulesContent({
  module, eventId, updateEventActivityAction,
  removeActivity, removeModule, moduleForm,
  isForCourse, onResult
}) {
  const { Title } = Typography;
  console.log(module);
  const [activities, setActivities] = useState(module.activities || []);

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
        <span>{ record.assistants ? record.assistants.length : record.students.length }</span>
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
            <Popconfirm
              okText="SI"
              cancelText="NO"
              title={`¿Eliminar ${record.activityName}?`}
              onConfirm={() => removeActivity(record).then((a) =>
                setActivities(activities.filter(activity => activity._id !== a._id))
              )}
            >
              <Icon type="delete" />
            </Popconfirm>
            <JustModal
              openComponent={<Icon type="edit" />}
              childElement={
                <AdminActivityForm
                  module={module}
                  eventId={eventId}
                  externalData={record}
                  grandfatherKey={isForCourse ? 'course' : null}
                  onResult={activity => setActivities(s => s.map(a => a._id === activity._id ? activity : a))}
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
    updateEventActivityAction(currentActivity._id, currentActivity).then((updatedActivity) => {
      if (isForCourse) setActivities(activities.map(a => a._id === updatedActivity._id ? updatedActivity : a))
    });
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
              grandfatherKey={isForCourse ? 'course' : null}
              onResult={activity => setActivities(s => [activity, ...s])}
            />
          }
        />
        <Popconfirm
          title={`¿Eliminar ${module.title}?`}
          okText="SI"
          cancelText="NO"
          onConfirm={() => removeModule(module).then(deleted => {
            if (onResult) onResult(deleted)
          })}
        >
          <AmgButton
            width="200px"
            marginTop="0px"
            bgColor="red" >
            Eliminar módulo
          </AmgButton>
        </Popconfirm>
        {
          moduleForm ? (
            <moduleForm.type {...moduleForm.props} existingData={module} dataPersistence />
          ) : (
            <JustModal
              openComponent={(
                <AmgButton width="200px" marginTop="0px" bgColor="yellow">
                  Editar módulo
                </AmgButton>
              )}
              childElement={<AdminModuleForm externalData={module} eventId={eventId} />}
            />
          )
        }
      </div>
      <Table dataSource={activities[0] ? activities : []} columns={columns} rowKey="_id" />
    </ContainerItem>
  );
}

export default ModulesContent;
