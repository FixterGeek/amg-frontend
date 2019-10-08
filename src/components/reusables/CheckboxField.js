import React from 'react';

import { Form, Checkbox } from 'antd';

function CheckboxField({
  label, checks, value,
  onChange, name, containerClassName,
  groupClassName, checksGroup
}) {
  const { Item } = Form;
  const { Group } = Checkbox;

  const handleChange = (valuesArray) => {
    if (onChange) onChange(valuesArray, name)
  }

  return (
    <Item label={label} className={`reusables-checkbox-field ${containerClassName}`}>
      <Group onChange={handleChange} value={value} className={`${groupClassName}`}>
        {
          checks && checks.map((check, index) => (
            <Checkbox value={check.value || check} key={index}>
              {check.label || check}
            </Checkbox>
          ))
        }
        <div className="reusables-checkbox-field-checks-group">
          {
            checksGroup && checksGroup.map((group, index) => {
              return (
                <div key={index} className="group-item">
                  <div className="group-name">{ group.name }</div>
                  {
                    group.checks.map((check, index) => (
                      <Checkbox value={check.value || check} key={index}>
                        {check.label || check}
                      </Checkbox>
                    ))
                  }
                </div>
              )
            })
          }
        </div>
      </Group>
    </Item>
  );
}

export default CheckboxField;
