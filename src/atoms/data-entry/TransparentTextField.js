import React from 'react';
import PropTypes from 'prop-types';

import { Input, Icon } from 'antd';

function TransparentTextField({
  value, icon, disabled, name, onClick, onChange
}) {
  return (
    <div className="transparent-input">
      <Input
        onChange={event => onChange(event)}
        style={!disabled ? { borderColor: '#666666' } : {}}
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
};

TransparentTextField.defaultProps = {
  value: '',
  icon: 'info-circle',
  disabled: false,
};
