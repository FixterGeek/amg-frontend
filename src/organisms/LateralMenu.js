import React, { useState } from 'react';

import { Icon } from 'antd';

import Menu from '../molecules/LateralMenu';

function LateralMenu() {
  const [active, setActive] = useState(false)

  return (
    <div className="component-lateral-menu" style={active ? { left: '0' } : {}}>
      <Icon
        type="menu"
        className="component-lateral-menu-icon"
        onClick={() => setActive(!active)} />
      <Menu />
    </div>
  );
}

export default LateralMenu;
