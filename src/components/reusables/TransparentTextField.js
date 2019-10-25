import React from 'react';
import PropTypes from 'prop-types';

import { Input, Icon } from 'antd';

function TransparentTextField({
  value, icon, disabled, name, onClick, onChange, placeholder
}) {
  return (
    <div className="transparent-input">
      <Input
        onChange={event => onChange(event)}
        style={!disabled ? { borderColor: '#666666' } : {}}
        placeholder={placeholder}
        disabled={disabled}
        value={value}
        name={name}
        suffix={<Icon type={icon} onClick={() => onClick(name)} />} />
    </div>
  );
}

export default TransparentTextField;

TransparentTextField.propTypes = {
  value: PropTypes.string,
  icon: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

TransparentTextField.defaultProps = {
  value: '',
  icon: 'info-circle',
  disabled: false,
  placeholder: '',
};
