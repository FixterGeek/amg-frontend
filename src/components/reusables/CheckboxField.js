import React, { useState } from 'react';

import { Form, Checkbox } from 'antd';

function CheckboxField({
  label, checks, value,
  onChange, name, containerClassName,
  groupClassName, checksGroup, sameValue,
  onlyOne,
}) {
  const { Item } = Form;
  const { Group } = Checkbox;

  const [val, setVal] = useState([]);

  const handleChange = (valuesArray, nameOfGroup) => {
    console.log(nameOfGroup);
    if (onChange) onChange(valuesArray, name || nameOfGroup);
    if (sameValue) {
      if (onlyOne) setVal(valuesArray[0]);
      else setVal(valuesArray);
    }
  }

  return (
    <Item label={label} className={`reusables-checkbox-field ${containerClassName}`}>
      <Group onChange={handleChange} value={sameValue ? val : value} className={`${groupClassName}`}>
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
