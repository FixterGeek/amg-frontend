import React from 'react';

import { Icon, Popover } from 'antd';

function ActionMenu() {
  const MenuContent = (
    <div>
      <p>Solicitar facturas</p>
      <p>Enviar mensaje privado</p>
      <p>Ver miembros</p>
    </div>
  );

  return (
    <Popover content={MenuContent} placement="left">
      <Icon type="more"/>
    </Popover>
  );
}

export default ActionMenu;
