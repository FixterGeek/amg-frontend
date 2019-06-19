import React from 'react';
import PropTypes from 'prop-types';

import Label from '../atoms/data_entry/Label';
import InputField from '../atoms/data_entry/InputField';

function TextField({ width, error, onChange, value }) {
  return (
    <div
      className="text-field"
      style={{ width, color: 'red' }}
    >
      <Label width="100%">
        Nombre
      </Label>
      <InputField
        width="100%"
        type="text"
        value={value}
        error={error}
        onChange={onChange ? event => onChange(event) : null}
      />
    </div>
  );
}

export default TextField;

TextField.propTypes = {
  width: PropTypes.string,
  error: PropTypes.bool,
  onChange: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  value: PropTypes.string,
};

TextField.defaultProps = {
  width: '445px',
  error: false,
  onChange: false,
  value: null,
};
