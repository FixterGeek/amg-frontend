import React from 'react';
import PropTypes from 'prop-types';

import { Form, Input } from 'antd';

function TextAreaField({
  label, onChange, value,
  placeholder, styles, name,
  rows, dots = true,
}) {
  const { Item } = Form;
  const { TextArea } = Input;

  const handleChange = (event) => {
    if (onChange) onChange(event);
  };

  return (
    <Item colon={dots} label={label} className="reusables-text-area-field">
      <TextArea
        onChange={handleChange}
        value={value}
        placeholder={placeholder}
        name={name}
        styles={styles}
        rows={rows}
      />
    </Item>
  );
}

export default TextAreaField;

TextAreaField.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  styles: PropTypes.object,
  name: PropTypes.string,
  rows: PropTypes.number,
}

TextAreaField.defaultProps = {
  label: null,
  onChange: null,
  value: null,
  placeholder: null,
  styles: null,
  name: null,
  rows: 4,
}
