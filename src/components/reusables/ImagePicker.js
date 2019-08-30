import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Form } from 'antd';

import FilePicker from './FilePicker';
import ImagePreview from './ImagePreview';

function ImagePicker({ label, onChange, onBase64, file, url }) {
  const { Item } = Form;

  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    if (!file)  setImageUrl(null)
    if (url) setImageUrl(url)
  }, [file, url]);

  const handleChange = ({ target }) => {
    if (onChange) onChange(target.files[0])
  }

  const handleBase64 = (url64) => {
    if (onBase64) onBase64(url64);
    setImageUrl(url64);
  }

  return (
    <Item label={label} className="reusables-image-picker">
      <FilePicker 
        onChange={handleChange}
        onBase64={handleBase64}
        type="forImages"
        name="preview" >
        <ImagePreview url={imageUrl} />
      </FilePicker>
    </Item>
  );
}

export default ImagePicker;

ImagePicker.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
}

ImagePicker.defaultProps = {
  label: '',
  onChange: null,
}
