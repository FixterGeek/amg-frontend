import React from 'react';
import PropTypes from 'prop-types';

import { Input } from 'antd';

import StatusSuffix from './StatusSuffix';
import StatusMessage from './StatusMessage';

function InputField({
  onChange, type, value, fontSize, width,
  successMessage, errorMessage, warningMessage,
  status, ...others
}) {
  return (
    <div className="input-field-container">
      <Input
        className={`input-field input-${status}`}
        style={{ fontSize, width }}
        onChange={onChange ? event => onChange(event) : null}
        type={type}
        value={value}
        {...others}
      />
      { status && <StatusSuffix status={status} /> }
      <StatusMessage status={status} />
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
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
  warningMessage: PropTypes.string,
  status: PropTypes.string.isRequired,
};

InputField.defaultProps = {
  onChange: false,
  fontSize: '1em',
  width: 'auto',
  value: null,
  errorMessage: null,
  successMessage: null,
  warningMessage: null,
};
