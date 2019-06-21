import React from 'react';
import PropTypes from 'prop-types';

import { Input, Icon } from 'antd';

import colorPalette from '../../styles/palette';

function InputField({
  onChange, type, value, fontSize, width, error, success,
  successMessage, errorMessage, ...others
}) {
  // Here start the magic
  const { red, green } = colorPalette;
  // eslint-disable-next-line no-nested-ternary
  const statusColor = error
    ? 'input-error' : success
      ? 'input-success' : '';

  return (
    <div className="input-field-container">
      <Input
        className={`input-field ${statusColor}`}
        style={{ fontSize, width, ...statusColor }}
        onChange={onChange ? event => onChange(event) : null}
        type={type}
        value={value}
        {...others}
      />
      {
        error || success
          ? (
            <div
              className="input-after-element"
              style={error
                ? { borderColor: red, color: red } : { borderColor: green, color: green }}
            >
              { error ? <Icon type="close" /> : <Icon type="check" /> }
            </div>
          )
          : null
      }
      {
        error || success
          ? (
            <div
              className="input-message"
              style={error
                ? { borderColor: red, color: red } : { borderColor: green, color: green }}
            >
              { error ? errorMessage : successMessage }
            </div>
          )
          : null
      }
    </div>
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
  errorMessage: PropTypes.string,
  success: PropTypes.bool,
  successMessage: PropTypes.string,
};

InputField.defaultProps = {
  onChange: false,
  fontSize: '1em',
  width: 'auto',
  error: false,
  value: null,
  errorMessage: null,
  success: false,
  successMessage: null,
};
