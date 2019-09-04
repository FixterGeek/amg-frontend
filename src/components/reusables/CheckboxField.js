import React from 'react';

import { Form, Checkbox } from 'antd';

function CheckboxField({
  label, checks, value, onChange, name,
}) {
  const { Item } = Form;
  const { Group } = Checkbox;

  const handleChange = (valuesArray) => {
    if (onChange) onChange(valuesArray, name)
  }

  return (
    <Item label={label} className="reusables-checkbox-field">
      <Group onChange={handleChange} value={value}>
        {
          checks.map((check, index) => (
            <Checkbox value={check.value || check} key={index}>
              {check.label || check}
            </Checkbox>
          ))
        }
      </Group>
    </Item>
  );
}

export default CheckboxField;
