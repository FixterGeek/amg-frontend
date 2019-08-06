import React from 'react';
import PropTypes from 'prop-types';

import { Input } from 'antd';

function Area({ rows }) {
  const { TextArea } = Input;

  return (
    <div className="text-area">
      <TextArea
        className="area"
        rows={rows}
        placeholder="Cuentanos un poco sobre ti..." />
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
