import React, { useState } from 'react';

import { Icon } from 'antd';

import FilePicker from '../../../atoms/FilePicker';
import ProfilePhoto from '../../../atoms/ProfilePhoto';

function UploadProfilePhoto({ onFile, onBase64 }) {
  const [photoUrl, setPhotoUrl] = useState(null)

  const handleBase64 = (base64Url) => {
    if (onBase64) onBase64(base64Url)
    setPhotoUrl(base64Url)
  }

  const handleFile = ({ target }) => {
    if (onFile) onFile(target.files[0])
  }

  return (
    <div className="basic-data-photo" style={{ maxWidth: '120px', marginBottom: '16px' }}>
      <FilePicker
        onChange={handleFile}
        onBase64={handleBase64}
        className="edit"
        name="photoURL"
        type="forImages">
        <Icon type="edit" />
      </FilePicker>
      <ProfilePhoto photoURL={photoUrl} />
    </div>
  )
}

export default UploadProfilePhoto;
