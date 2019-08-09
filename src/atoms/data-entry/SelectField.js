import React from 'react';
import PropTypes from 'prop-types';

import { Select } from 'antd';

function SelectField({ options, onChange, status }) {
  const { Option } = Select;
  return (
    <Select
      className={`select-field select-${status}`}
      onChange={onChange ? event => onChange(event) : null}>
      {
        options.map((option, index) => (
          <Option className="select-field-option" key={option.index || index} value={option.value}>
            { option.text }
          </Option>
        ))
      }
    </Select>
  );
}

export default SelectField;

SelectField.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  status: PropTypes.string.isRequired,
};

SelectField.defaultProps = {
  options: null,
  onChange: false,
};
