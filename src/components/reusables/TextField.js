import React from 'react';

import { Form, Input } from 'antd';

function TextField({
  label, name, value, placeholder,
  validateStatus, onChange,
  errorMessage, dots = true, ...others
}) {
  const { Item } = Form;

  const handleChange = ({ target }) => {
    const { name, value } = target;
    if (onChange) onChange({ target: { name, value } });
  }
  return (
    <Item
      colon={dots}
      label={label}
      className="reusables-text-field"
      hasFeedback
      help={errorMessage}
      validateStatus={validateStatus}>
      <Input
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        { ...others }
      />
    </Item>
  );
}

export default TextField;
