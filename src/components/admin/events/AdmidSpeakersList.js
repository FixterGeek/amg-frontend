import React from 'react';
import Proptypes from 'prop-types';

import { Icon, Popover, Popconfirm } from 'antd';

import BoxItem from '../../reusables/BoxItem';
import AdminSpeakerForm from './AdminSpeakerForm';

function AdminSpeakerList({ speakers, event, saveDraftEvent }) {
  const defaultPhoto = 'https://firebasestorage.googleapis.com/v0/b/amgweb.appspot.com/o/reusables%2Fprofile_9.png?alt=media&token=be192ce4-34cd-440d-a898-632d13acb44a';

  const handleDelete = (speakerId) => {
    const eventData = normalizeData({ ...event, speakers: event.speakers.filter(s => s._id !== speakerId), id: event._id });
    const form = new FormData();
    const formData = transformToFormData(form, eventData.normalizedData);
    saveDraftEvent({ body: formData, id: event._id });
  };

  const normalizeData = (eventData) => {
    delete eventData.modules;
    delete eventData.assistants;
    delete eventData.courses;
    const id = eventData._id;
    delete eventData._id;
    return { normalizedData: eventData, id };
  }

  function transformToFormData(formData, obj, parentKey) {
    if (parentKey) {
        for (let k in obj) {
            formData.append(`${parentKey}[${k}]`, obj[k])
        }
    }
    else {
        for (let k in obj) {
            if (k === "permisos" || k === "mainImages") {
                formData.append(k, obj[k])
                continue
            }
            if (Array.isArray(obj[k]) || typeof obj[k] === "object") {
                formData.append(k, JSON.stringify(obj[k]))
                continue
            }
            // if (typeof obj[k] === "object") transformToFormData(formData, obj[k], k)
            else formData.append(k, obj[k])
        }
    }
    return formData
  }

  return (
    <div>
      {
        speakers.map(speaker => {
          return (
            <div style={{ position: 'relative' }}>
              <BoxItem
                title={speaker.fullName}
                subtitle={speaker.title}
                footer={speaker.city}
                leftIsImage
                imageUrl={speaker.photoURL || defaultPhoto}
              />
              <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
                <Popover
                  placement="left"
                  content={
                    <div>
                      <div style={{ cursor: 'pointer' }}>
                        <AdminSpeakerForm isModal existingData={speaker} event={event} />
                      </div>
                      <Popconfirm
                        okText="SI"
                        cancelText="NO"
                        title={`¿Eliminar a ${speaker.fullName}?`}
                        onConfirm={() => handleDelete(speaker._id)}
                      >
                        <span style={{ color: '#e24c4c', cursor: 'pointer' }}>
                          Eliminar <Icon type="delete" />
                        </span>
                      </Popconfirm>
                    </div>
                  }
                >
                  <Icon type="more" style={{ fontSize: '1.4rem' }} />
                </Popover>
              </div>
            </div>
          )
        })
      }
    </div>
  );
}

export default AdminSpeakerList;

AdminSpeakerList.propTypes = {
  speakers: Proptypes.array,
};

AdminSpeakerList.defaultProps = {
  speakers: [],
};
