import React from 'react';

import { Form, Input } from 'antd';

function PasswordField({ label, name, value, placeholder, onChange, ...rest }) {
  const { Item } = Form;
  const { Password } = Input;

  const handleChange = (event) => {
    if (onChange) onChange(event, value);
  }

  return (
    <Item label={label} className="reusables-password-field">
      <Password
        onChange={handleChange}
        name={name}
        value={value}
        placeholder={placeholder}
        {...rest}
      />
    </Item>
  );
}

export default PasswordField;