import React from 'react';
import PropTypes from 'prop-types';

import { DatePicker } from 'antd';

import Label from '../atoms/data-entry/Label';

function DateMonthPicker({ label, format, onChange }) {
  const { MonthPicker } = DatePicker;
  return (
    <div>
      <div>
        <Label>{ label }</Label>
      </div>
      <MonthPicker format={format} onChange={onChange ? event => onChange(event) : null} />
    </div>
  );
}

export default DateMonthPicker;

DateMonthPicker.propTypes = {
  label: PropTypes.string,
  format: PropTypes.string,
  onChange: PropTypes.func,
};

DateMonthPicker.defaultProps = {
  label: 'Set a label',
  format: 'MM/YYYY',
  onChange: null,
};
