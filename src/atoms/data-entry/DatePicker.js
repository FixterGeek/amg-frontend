import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { DatePicker as DP } from 'antd';

function DatePicker({ name, style, format, onChange, placeholder, value }) {
  return (
    <div className="date-picker">
      <DP
        format={format}
        name={name}
        style={{ ...style }}
        placeholder={placeholder}
        value={value ? moment(value) : null}
        onChange={onChange ? event => onChange(event, name) : null} />
    </div>
  );
}

export default DatePicker;

DatePicker.propTypes = {
  width: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string.isRequired,
  format: PropTypes.string,
  style: PropTypes.object,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

DatePicker.defaultProps = {
  width: 'auto',
  onChange: null,
  format: null,
  style: null,
  value: null,
};
