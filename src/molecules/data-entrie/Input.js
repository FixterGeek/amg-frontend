/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';

import Label from '../../atoms/data-entry/Label';
import StatusMessage from '../../atoms/data-entry/StatusMessage';
import StatusSuffix from '../../atoms/data-entry/StatusSuffix';

function InputField({
  children, label, error, success, warning, errorMessage,
  successMessage, warningMessage,
}) {
  const status = error
    ? 'error' : success
      ? 'success' : warning
        ? 'warning' : '';

  return (
    <div className="input">
      <Label>{ label }</Label>
      <div className={`field ${status}`}>
        { children }
        { status && <StatusSuffix status={status} /> }
      </div>
      <StatusMessage
        status={status}
        errorMessage={errorMessage}
        successMessage={successMessage}
        warningMessage={warningMessage} />
    </div>
  );
}

export default InputField;

InputField.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.bool,
  success: PropTypes.bool,
  warning: PropTypes.bool,
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
  warningMessage: PropTypes.string,
};

InputField.defaultProps = {
  error: false,
  success: false,
  warning: false,
  errorMessage: null,
  successMessage: null,
  warningMessage: null,
};
