import React, { useState } from 'react';
import toFormData from 'object-to-formdata';

import { Typography, Icon, Button } from 'antd';

import useSweetAlert from '../../../hooks/useSweetAlert';
import fileToURL from '../../../tools/fileToURL';
import DashboardContainerItem from '../../../atoms/DashboardContainerItem';
import ProfilePhoto from '../../../atoms/ProfilePhoto';
import TransparentTextField from '../../reusables/TransparentTextField';
import FilePicker from '../../../atoms/FilePicker';
import ModalName from '../modals/ModalName';

function BasicData({
  user, membershipStatus, dispatch,
}) {
  const { Title, Text } = Typography;

  const { infoAlert, errorAlert } = useSweetAlert();
  const { basicData } = user;
  const { placeOfBirth = {} } = basicData;
  const [speciality, setSpeciality] = useState();
  const [address, setAddress] = useState(basicData.placeOfBirth.addressName);
  const [temporalPhoto, setTemporalPhoto] = useState();
  const [photoFile, setPhotoFile] = useState();
  const [phone, setPhone] = useState(basicData.phone);
  const [edits, setEdits] = useState({
    photoURL: {
      edit: false,
      icon: 'edit',
    },
    speciality: {
      edit: false,
      icon: 'edit',
    },
    addressName: {
      edit: false,
      icon: 'edit',
    },
    phone: {
      edit: false,
      icon: 'edit',
    }
  });

  const handleEdit = (name) => {
    let icon = 'edit';
    if (!edits[name].edit) {
      icon = 'save';
      setEdits({
        ...edits,
        [name]: {
          edit: !edits[name].edit,
          icon,
        },
      });
    } else {
      dispatch({
        ...user,
        basicData: {
          ...user.basicData,
          phone,
          placeOfBirth: {
            ...user.basicData.placeOfBirth,
            addressName: address,
          },
        },
      }).catch(() => errorAlert());
    }
  };

  const handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;

    if (name === 'speciality') setSpeciality(value);
    else if (name === 'phone') setPhone(value);
    else setAddress(value);
  };

  const handleFilePicker = (event) => {
    const { target } = event;
    const { files } = target;

    setPhotoFile(files[0]);
    setEdits({ ...edits, photoURL: { edit: true, icon: 'save' } });

    fileToURL(files[0]).then((url) => {
      setTemporalPhoto(url);
      infoAlert({ text: 'Da clic sobre el boton de guardar, para actualizar tu foto.' });
    });
  };

  const savePhoto = () => {
    const formData = toFormData({ basicData, photo: photoFile }, { nulls: true });

    dispatch(formData);
  };

  return (
    <DashboardContainerItem className="info">
      <div className="basic-data-photo">
        {
          !edits.photoURL.edit ? (
            <FilePicker
              onChange={handleFilePicker}
              className="edit"
              name="photoURL"
              type="forImages">
              <Icon type="edit" />
            </FilePicker>
          ) : (
            <Button
              onClick={savePhoto}
              className="edit"
              shape="round"
              icon="save"
              type="primary" />
          )
        }
        <ProfilePhoto photoURL={temporalPhoto || basicData.photoURL || 'https://firebasestorage.googleapis.com/v0/b/amgweb.appspot.com/o/reusables%2Fprofile_9.png?alt=media&token=be192ce4-34cd-440d-a898-632d13acb44a'} />
      </div>

      <ModalName user={user} dispatch={dispatch} />
      <Title level={3}>{ membershipStatus }</Title>
      <Text>{ basicData.speciality }</Text>
      <div style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center' }}>
        <strong style={{ marginRight: '8px'}}>Lugar:</strong>
        <TransparentTextField
          onChange={handleChange}
          onClick={handleEdit}
          placeholder="Lugar"
          name="addressName"
          disabled={!edits.addressName.edit}
          value={address || placeOfBirth.addressName}
          icon={edits.addressName.icon} />
      </div>
      <div style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center' }}>
        <strong style={{ marginRight: '8px'}}>Número telefónico:</strong>
        <TransparentTextField
          onChange={handleChange}
          onClick={handleEdit}
          placeholder="5555555555"
          name="phone"
          disabled={!edits.phone.edit}
          value={phone || basicData.phone}
          icon={edits.phone.icon} />
      </div>
    </DashboardContainerItem>
  );
}

export default BasicData;
