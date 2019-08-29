import React from 'react';

import { Spin, Icon } from 'antd';

function Spinner() {
  return (
    <div className="reusables-spinner">
      <Spin
        indicator={<Icon type="loading" style={{ fontSize: '36px' }} />}
      />
    </div>
  );
}

export default Spinner;
