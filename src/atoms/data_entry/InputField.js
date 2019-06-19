import React from 'react';
import PropTypes from 'prop-types';

import { Input } from 'antd';

function InputField({
  onChange, type, value, fontSize, width, error, ...others
}) {
  // Here start the magic
  const primaryClasses = error ? 'input-field  input-field__error' : 'input-field';
  return (
    <Input
      className={primaryClasses}
      style={{ fontSize, width }}
      onChange={onChange ? event => onChange(event) : null}
      type={type}
      value={value}
      {...others}
    />
  );
}

export default InputField;

InputField.propTypes = {
  onChange: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  fontSize: PropTypes.string,
  width: PropTypes.string,
  error: PropTypes.bool,
};

InputField.defaultProps = {
  onChange: false,
  fontSize: '1em',
  width: 'auto',
  error: false,
  value: null,
};
