import React from 'react';
import PropTypes from 'prop-types';

function EventImage({ children, image, size }) {
  return (
    <div
      className={size === 'large' ? 'event-image-large' : 'event-image'}
      style={{ backgroundImage: `url(${image})` }}>
      { children }
    </div>
  );
}

export default EventImage;

EventImage.propTypes = {
  children: PropTypes.element.isRequired,
  image: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};
