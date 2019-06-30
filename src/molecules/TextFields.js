/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';

import Label from '../atoms/data_entry/Label';
import InputField from '../atoms/data_entry/InputField';
import { size } from '../styles/theme';

function TextField({
  width, error, success, warning,
  errorMessage, successMessage, warningMessage,
  onChange, value, label,
  marginTop, marginBottom, ...others
}) {
  const status = error
    ? 'error' : success
      ? 'success' : warning
        ? 'warning' : '';

  return (
    <div
      className="text-field"
      style={{
        width,
        color: 'red',
        marginTop,
        marginBottom,
      }}
    >
      <Label width="100%">
        { label }
      </Label>
      <InputField
        width="100%"
        type="text"
        value={value}
        status={status}
        errorMessage={errorMessage}
        successMessage={successMessage}
        warningMessage={warningMessage}
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
  warning: PropTypes.bool,
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
  warningMessage: PropTypes.string,
  onChange: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  value: PropTypes.string,
  label: PropTypes.string,
  marginTop: PropTypes.string,
  marginBottom: PropTypes.string,
};

TextField.defaultProps = {
  width: 'auto',
  error: false,
  success: false,
  warning: false,
  warningMessage: 'Probably something is not right.',
  errorMessage: 'Opps! Somethings not right here.',
  successMessage: 'Perfect!',
  onChange: false,
  value: null,
  label: 'Field Name',
  marginTop: size.fields.margin,
  marginBottom: size.fields.margin,
};
