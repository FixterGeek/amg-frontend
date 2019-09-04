import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Form, DatePicker } from 'antd';

function DatePickerField({
  label, placeholder, format, value,
  showToday, onChange, name
}) {
  const { Item } = Form;

  const handleChange = (moment) => {
    if (onChange) onChange(moment, name);
  }

  return (
    <Item label={label} className="reusables-date-picker-field">
      <DatePicker
        onChange={handleChange}
        placeholder={placeholder}
        format={format}
        value={value ? moment(value) : null}
        showToday={showToday}
      />
    </Item>
  );
}

export default DatePickerField;

DatePickerField.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  format: PropTypes.string,
  value: PropTypes.node,
  showToday: PropTypes.bool,
  onChange: PropTypes.func,
  name: PropTypes.string,
}

DatePickerField.defaultProps = {
  label: null,
  placeholder: 'Seleccionar fecha',
  format: 'DD/MMMM/YYYY',
  value: null,
  showToday: false,
  onChange: null,
  name: null,
}
