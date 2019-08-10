import React from 'react';

import PropTypes from 'prop-types';

function StatusMessage({
  errorMessage, successMessage, warningMessage, status,
}) {
  let currentMessage = '';

  if (status === 'error') currentMessage = errorMessage;
  if (status === 'success') currentMessage = successMessage;
  if (status === 'warning') currentMessage = warningMessage;

  return (
    <div className={`status status-${status}`}>
      { currentMessage }
    </div>
  );
}

export default StatusMessage;

StatusMessage.propTypes = {
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
  warningMessage: PropTypes.string,
  status: PropTypes.string.isRequired,
};

StatusMessage.defaultProps = {
  errorMessage: 'Opps! Something not right here.',
  successMessage: 'Perfect',
  warningMessage: 'Probably something is not right.',
};
