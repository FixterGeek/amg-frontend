import React from 'react';
import PropTypes from 'prop-types';

import Label from '../atoms/data-entry/Label';
import Date from '../atoms/data-entry/DatePicker';

function DatePicker({ name, label, width, onChange }) {
  return (
    <div>
      <Label>{ label }</Label>
      <Date width={width} onChange={onChange} name={name} />
    </div>
  );

}

export default DatePicker;

DatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  width: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string.isRequired,
};

DatePicker.defaultProps = {
  width: 'auto',
  onChange: null,
};
