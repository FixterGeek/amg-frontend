import React from 'react';

import { Spin, Icon } from 'antd';

function Spinner({ fullScrren }) {
  return (
    <div className={`${fullScrren ? 'reusables-spinner-fullscreen' : 'reusables-spinner'}`}>
      <Spin
        indicator={<Icon type="loading" style={{ fontSize: '36px' }} />}
      />
    </div>
  );
}

export default Spinner;
