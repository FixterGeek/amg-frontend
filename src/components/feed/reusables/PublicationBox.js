import React from 'react';

import { Input } from 'antd';

import ImagePreview from '../../reusables/ImagePreview';

function PublicationBox({ photoUrl, value, onChange }) {
  const defaultPhoto = 'https://firebasestorage.googleapis.com/v0/b/amgweb.appspot.com/o/reusables%2FAsset%20190.png?alt=media&token=1b14df1f-251f-4c41-a33e-db500a75fb79';
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
