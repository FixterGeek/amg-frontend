import React, { useState } from 'react';

import { Typography, Icon, Button } from 'antd';

import useAmgService from '../../hooks/services/useAmgService';
import useSweetAlert from '../../hooks/useSweetAlert';
import fileToURL from '../../tools/fileToURL';
import { writeUser, writeUserBasicData, writeUserAddress } from '../../store/actions';
import DashboardContainerItem from '../../atoms/DashboardContainerItem';
import ProfilePhoto from '../../atoms/ProfilePhoto';
import TransparentTextField from '../../atoms/data_entry/TransparentTextField';
import FilePicker from '../../atoms/FilePicker';

function BasicData({
  userId, membershipStatus, basicData,
  photoFile, dispatch,
}) {
  const { infoAlert, errorAlert } = useSweetAlert();
  const { updateUser, updateUserPhoto } = useAmgService();
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
  });
  const { Title, Text } = Typography;
  const { speciality, address: { addressName } } = basicData;

  const handleEdit = (name) => {
    console.log('edit');
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
      updateUser(userId, {
        basicData: {
          ...basicData,
        },
      }).then((data) => {
        console.log(data);
      }).catch(() => errorAlert());
    }
  };

  const handleChange = (event) => {
    console.log('change');
    const { target } = event;
    const { name, value } = target;
    console.log(value);
    if (name === 'speciality') dispatch(writeUserBasicData({ [name]: value }));
    else dispatch(writeUserAddress({ [name]: value }));
  };

  const handleFilePicker = (event) => {
    console.log('picker')
    const { target } = event;
    const { files } = target;

    dispatch(writeUser({ photo: files[0] }));
    setEdits({ ...edits, photoURL: { edit: true, icon: 'save' } });

    fileToURL(files[0]).then((url) => {
      dispatch(writeUserBasicData({ photoURL: url }));
      infoAlert({ text: 'Da clic sobre el boton de guardar, para actualizar tu foto.' });
    });
  };

  const savePhoto = () => {
    console.log('save');
    const formData = new FormData();
    formData.append('photo', photoFile);
    formData.append('basicData[speciality]', speciality);

    updateUserPhoto(userId, formData)
      .then(data => console.log(data))
      .catch(error => console.log(error));
  };

  console.log(basicData);

  return (
    <DashboardContainerItem className="basic-data">
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
        <ProfilePhoto photoURL={basicData.photoURL} />
      </div>
      <div className="basic-data-info">
        <Title level={3}>{ membershipStatus }</Title>
        <TransparentTextField
          onChange={handleChange}
          onClick={handleEdit}
          name="speciality"
          disabled={!edits.speciality.edit}
          value={speciality}
          icon={edits.speciality.icon} />
        <TransparentTextField
          onChange={handleChange}
          onClick={handleEdit}
          name="addressName"
          disabled={!edits.addressName.edit}
          value={addressName}
          icon={edits.addressName.icon} />

        <div className="basic-data-folow">
          <div>
            <Text strong>Te siguen</Text>
            <div level={4}>102</div>
          </div>
          <div>
            <Text strong>Sigues</Text>
            <div>58</div>
          </div>
        </div>
      </div>
    </DashboardContainerItem>
  );
}

export default BasicData;
