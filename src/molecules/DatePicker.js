import React from 'react';
import PropTypes from 'prop-types';

import Label from '../atoms/data-entry/Label';
import Date from '../atoms/data-entry/DatePicker';

function DatePicker({ name, label, style, onChange, format, placeholder, value }) {
  return (
    <div>
      <Label>{ label }</Label>
      <Date
        style={{ ...style }}
        onChange={onChange}
        name={name}
        format={format}
        placeholder={placeholder}
        value={value} />
    </div>
  );

}

export default DatePicker;

DatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  width: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string.isRequired,
  format: PropTypes.string,
};

DatePicker.defaultProps = {
  width: 'auto',
  onChange: null,
  format: null,
};
