import React from 'react';
import PropTypes from 'prop-types';

import { Input } from 'antd';

function Area({ rows, onChange, value, placeholder }) {
  const { TextArea } = Input;

  return (
    <div className="text-area">
      <TextArea
        onChange={event => onChange(event)}
        value={value}
        className="area"
        rows={rows}
        placeholder={placeholder}
      />
    </div>
  );
}

export default Area;

Area.propTypes = {
  rows: PropTypes.number,
};

Area.defaultProps = {
  rows: 4,
};
