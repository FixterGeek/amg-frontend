import React from 'react';
import PropTypes from 'prop-types';

import { Select } from 'antd';

function SelectField({
  options, onChange, status, value, useKeys, ...others
}) {
  const { Option } = Select;
  return (
    <Select
      { ...others }
      value={value}
      className={`select-field select-${status}`}
      onChange={onChange ? (value, event) => onChange(value, event) : null}>
      {
        options.map((option, index) => (
          <Option
            className="select-field-option"
            key={option[useKeys[0]] || index}
            index={index}
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
  useKeys: PropTypes.arrayOf(PropTypes.string),
};

SelectField.defaultProps = {
  options: [],
  onChange: false,
  useKeys: ['index', 'value', 'text'],
};
