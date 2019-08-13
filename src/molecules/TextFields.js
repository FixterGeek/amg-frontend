/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';

import Label from '../atoms/data-entry/Label';
import InputField from '../atoms/data-entry/InputField';
import { size } from '../styles/theme';
import { Input } from 'antd'
let { TextArea } = Input

function TextField({
  width, error, success, warning,
  errorMessage, successMessage, warningMessage,
  onChange, value, label,
  password,
  name,
  type,
  style, ...others
}) {
  const status = error
    ? 'error' : success
      ? 'success' : warning
        ? 'warning' : '';

  return (
    <div
      className="text-field"
      style={style}
    >
      <Label width="100%">
        {label}
      </Label>
      {type !== "textarea" ? <InputField
        password={password}
        name={name}
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
        :
        <TextArea
          rows="6"
          style={{ marginBottom: 40 }}
          name={name}
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
      }
    </div>
  );
}

export default TextField;

TextField.propTypes = {
  name: PropTypes.string,
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
  style: PropTypes.object,
  type: PropTypes.string,
  password: PropTypes.bool,
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
  style: {},
  password: false,
};
