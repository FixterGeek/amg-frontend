import React from 'react';
import PropTypes from 'prop-types';

import { DatePicker as DP } from 'antd';

function DatePicker({ name, width, onChange }) {
  return (
    <div className="date-picker">
      <DP name={name} style={{ width }} onChange={onChange ? event => onChange(event) : null} />
    </div>
  );
}

export default DatePicker;

DatePicker.propTypes = {
  width: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string.isRequired,
};

DatePicker.defaultProps = {
  width: 'auto',
  onChange: null,
};
