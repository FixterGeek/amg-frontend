import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Form, TimePicker } from 'antd';

function TimePickerField({
  label, name, value,
  onChange, placeholder, format
}) {
  const { Item } = Form;

  const handleChange = (moment) => {
    if (onChange) onChange(moment, name);
  };

  return (
    <Item label={label} className="reusables-time-picker-field">
      <TimePicker
        onChange={handleChange}
        value={value ? moment(value) : null}
        format={format}
        placeholder={placeholder}
      />
    </Item>    
  );
}

export default TimePickerField;

TimePickerField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  format: PropTypes.string,
};

TimePickerField.defaultProps = {
  label: null,
  name: null,
  value: null,
  onChange: null,
  placeholder: null,
  format: 'hh:mm a',
}
