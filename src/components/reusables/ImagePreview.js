import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'antd';

function ImagePreview({ url, alt, containerStyle, imageStyle }) {
  return (
    <div className="reusables-image-preview" style={containerStyle}>
      { 
        url ? <img src={url} alt={alt} style={imageStyle} />
          : <Icon type="plus" />
      }
    </div>
  );
}

export default ImagePreview;

ImagePreview.propTypes = {
  url: PropTypes.string,
  alt: PropTypes.string,
  containerStyle: PropTypes.object,
  imageStyle: PropTypes.object,
};

ImagePreview.defaultProps = {
  url: null,
  alt: 'Preview de imagen',
  containerStyle: {},
  imageStyle: {},
};
