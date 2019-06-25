import React from 'react';
import PropTypes from 'prop-types';

import { Spin } from 'antd';

function Spinner({ size, tip }) {
  return (
    <div className="spinner">
      <Spin size={size} tip={tip} />
    </div>
  );
}

export default Spinner;

Spinner.propTypes = {
  size: PropTypes.string,
  tip: PropTypes.string,
};

Spinner.defaultProps = {
  size: 'large',
  tip: 'Cargando...',
};
