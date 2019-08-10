/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';

import Label from '../atoms/data-entry/Label';
import Select from '../atoms/data-entry/SelectField';
import StatusMessage from '../atoms/data-entry/StatusMessage';
import { size } from '../styles/theme';

function SelectField({
  label, onChange, options,
  error, errorMessage, success,
  successMessage, warning, warningMessage,
  marginTop, marginBottom,
}) {
  const status = error
    ? 'error' : success
      ? 'success' : warning
        ? 'warning' : '';

  return (
    <div
      className="text-field"
      style={{
        marginTop,
        marginBottom,
      }}>
      <Label>{ label }</Label>
      <Select
        onChanche={onChange}
        options={options}
        status={status} />
      <StatusMessage
        errorMessage={errorMessage}
        successMessage={successMessage}
        warningMessage={warningMessage}
        status={status} />
    </div>
  );
}

export default SelectField;

SelectField.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  options: PropTypes.arrayOf(PropTypes.shape({
    index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    text: PropTypes.string.isRequired,
  })),
  error: PropTypes.bool,
  success: PropTypes.bool,
  warning: PropTypes.bool,
  successMessage: PropTypes.string,
  warningMessage: PropTypes.string,
  errorMessage: PropTypes.string,
  marginTop: PropTypes.string,
  marginBottom: PropTypes.string,
};

SelectField.defaultProps = {
  label: 'Select Field',
  onChange: false,
  options: [
    { value: 1, text: 'Option example1' },
    { value: 2, text: 'Option example2' },
    { value: 3, text: 'Option example3' },
  ],
  error: false,
  success: false,
  warning: false,
  errorMessage: 'Opps! Something not right here.',
  successMessage: 'Perfect',
  warningMessage: 'Probably something is not right.',
  marginTop: size.largeMargin,
  marginBottom: size.margin,
};
