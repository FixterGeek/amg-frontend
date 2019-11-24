import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'antd';

function ImagePreview({
  url, alt, activeCenterText, containerStyle, imageStyle, onClick,
  isVideo, videoStyle, autoPlay
}) {
  const handleClick = (event) => {
    if (onClick) onClick(event);
  }

  const MediaCreator = () => {
    if (isVideo) return (
      <video src={url} alt={alt} style={videoStyle} controls={false} autoPlay={autoPlay} />
    )

    return (
      <img src={url} alt={alt} style={imageStyle} />
    )
  }

  // console.log(isVideo)

  return (
    <div
      className="reusables-image-preview"
      onClick={handleClick}
      style={{ ...containerStyle }}>
      { 
        url ? <MediaCreator />
          : <Icon type="plus" />
      }
      {
        activeCenterText && <div className="reusables-image-preview-active-text">
          { activeCenterText }
        </div>
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
  centerText: PropTypes.node,
  onClick: PropTypes.func,
  autoPlay: PropTypes.bool,
};

ImagePreview.defaultProps = {
  url: null,
  alt: 'Preview de imagen',
  containerStyle: {},
  imageStyle: {},
  centerText: null,
  onClick: null,
  autoPlay: false,
};
