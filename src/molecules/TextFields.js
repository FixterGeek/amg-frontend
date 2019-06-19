import React from 'react';
import PropTypes from 'prop-types';

import Label from '../atoms/data_entry/Label';
import InputField from '../atoms/data_entry/InputField';

function TextField({
  width, error, success, errorMessage, successMessage, onChange, value, label, ...others
}) {
  return (
    <div
      className="text-field"
      style={{ width, color: 'red' }}
    >
      <Label width="100%">
        { label }
      </Label>
      <InputField
        width="100%"
        type="text"
        value={value}
        error={error}
        errorMessage={errorMessage}
        success={success}
        successMessage={successMessage}
        onChange={onChange ? event => onChange(event) : null}
        {...others}
      />
    </div>
  );
}

export default TextField;

TextField.propTypes = {
  width: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
  onChange: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  value: PropTypes.string,
  label: PropTypes.string,
};

TextField.defaultProps = {
  width: '445px',
  error: false,
  success: false,
  errorMessage: 'Opps! Somethings not right here.',
  successMessage: 'Perfect!',
  onChange: false,
  value: null,
  label: 'Field Name',
};
