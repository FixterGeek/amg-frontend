import React from 'react';

import { Input } from 'antd';

import ImagePreview from '../../reusables/ImagePreview';

function PublicationBox({ photoUrl, value, onChange }) {
  const defaultPhoto = 'https://firebasestorage.googleapis.com/v0/b/amgweb.appspot.com/o/reusables%2Fprofile_9.png?alt=media&token=be192ce4-34cd-440d-a898-632d13acb44a';
  const { TextArea } = Input;

  const handleChange = ({ target }) => {
    if (onChange) onChange(target.value)
  }

  return (
    <div className="feed-reusables-publication-box">
      <ImagePreview url={photoUrl || defaultPhoto} />
      <TextArea
        onChange={handleChange}
        value={value}
        rows={5}
      />
    </div>
  );
}

export default PublicationBox;
