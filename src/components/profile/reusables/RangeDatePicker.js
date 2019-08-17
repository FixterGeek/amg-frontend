import React from 'react';
import moment from 'moment';

import { DatePicker } from 'antd';

import Label from '../../../atoms/data-entry/Label';

function RangeDatePicker({
  label, onChange, value, style, placeholder = ['Inicio', 'Termino'],
  dateOne, dateTwo,
}) {
  const { RangePicker } = DatePicker;
  console.log(value);
  return (
    <div>
      <Label>{ label }</Label>
      <div className="reusable-component-range-picker">
        <RangePicker
          onChange={onChange ? moments => onChange(moments) : null}
          placeholder={placeholder}
          value={dateOne && dateTwo ? [moment(dateOne), moment(dateTwo)] : null}
        />
      </div>
    </div>
  );
}

export default RangeDatePicker;
