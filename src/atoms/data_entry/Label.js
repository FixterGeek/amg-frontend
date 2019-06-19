import React from 'react';
import PropTypes from 'prop-types';

function Label({ children, htmlFor, fontSize, width }) {
  return (
    <label
      className="input-label"
      style={{ fontSize, width }}
      htmlFor={htmlFor}
    >
      { children }
    </label>
  );
}

export default Label;

Label.propTypes = {
  children: PropTypes.string.isRequired,
  htmlFor: PropTypes.string,
  fontSize: PropTypes.string,
  width: PropTypes.string,
};

Label.defaultProps = {
  htmlFor: '',
  fontSize: '1em',
  width: 'auto',
};
