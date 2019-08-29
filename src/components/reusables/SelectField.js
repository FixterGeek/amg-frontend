import React from 'react';

import { Form, Select } from 'antd';
export const { Option: OptionSelect } = Select;

function SelectField({ label, name, children, value, onChange, placeholder }) {
  const { Item } = Form;

  const handleChange = (value, event) => {
    if (onChange) onChange(value, event);
  }
  return (
    <Item label={label} className="reusables-select-field">
      <Select
        onChange={handleChange}
        value={value}
        placeholder={placeholder}
        name={name} >

        { children }
      </Select>
    </Item>
  );
}

export default SelectField;
