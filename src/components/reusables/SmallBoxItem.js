import React from 'react';
import { withRouter } from 'react-router-dom';

import { Typography } from 'antd';

function SmallBoxItem({ title, rigth, rigthComponent, history, to }) {
  const { Text } = Typography;

  const handleClick = () => {
    if (to) history.push(to);
  }

  return (
    <a className="reusables-small-box-item" onClick={handleClick}>
      <Text strong>{title}</Text>
      <div className="rigth">
        { rigth || rigthComponent }
      </div>
    </a>
  );
}

export default withRouter(SmallBoxItem);
