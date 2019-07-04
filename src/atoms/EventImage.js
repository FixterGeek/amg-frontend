import React from 'react';
import PropTypes from 'prop-types';

function EventImage({ children, image }) {
  return (
    <div className="event-image" style={{ backgroundImage: `url(${image})` }}>
      { children }
    </div>
  );
}

export default EventImage;

EventImage.propTypes = {
  children: PropTypes.element.isRequired,
  image: PropTypes.string.isRequired,
};
