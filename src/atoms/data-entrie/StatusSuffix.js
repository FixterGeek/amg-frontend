/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from 'antd';

import { palette } from '../../styles/theme';

function StatusSuffix({ status }) {
  const type = status === 'error' ? 'close'
    : status === 'success' ? 'check'
      : status === 'warning' ? 'warning' : '';

  const color = status === 'error' ? 'red'
    : status === 'success' ? 'green'
      : status === 'warning' ? 'yellow' : '';

  return (
    <div
      className="input-after-element"
      style={{ borderColor: palette[color], color: palette[color] }}>
      <Icon type={type} />
    </div>
  );
}

export default StatusSuffix;

StatusSuffix.propTypes = {
  status: PropTypes.string.isRequired,
};
