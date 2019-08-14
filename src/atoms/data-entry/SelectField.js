import React from 'react';
import PropTypes from 'prop-types';

import { Select } from 'antd';

function SelectField({ options, onChange, status, value, useKeys = ['index', 'value', 'text'] }) {
  const { Option } = Select;
  return (
    <Select
      value={value}
      className={`select-field select-${status}`}
      onChange={onChange ? (value, event) => onChange(value, event) : null}>
      {
        options.map((option, index) => (
          <Option
            className="select-field-option"
            key={option[useKeys[0]] || index}
            value={option[useKeys[1]] || option}>
            {option[useKeys[2]] || option}
          </Option>
        ))
      }
    </Select>
  );
}

export default SelectField;

SelectField.propTypes = {
  options: PropTypes.oneOfType(
    [PropTypes.arrayOf(PropTypes.string), PropTypes.arrayOf(PropTypes.object)],
  ),
  onChange: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  status: PropTypes.string.isRequired,
};

SelectField.defaultProps = {
  options: [],
  onChange: false,
};
