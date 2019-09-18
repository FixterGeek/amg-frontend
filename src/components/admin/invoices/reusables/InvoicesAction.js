import React, { useState } from 'react';
import { Icon, Menu, Popover } from 'antd';

function InvoicesAction() {
  const baseClass = 'admin-invoices-reusables-invoices-action';
  const { Item } = Menu;

  const [menuVisible, setMenuVisible] = useState('invisible');

  const MoreMenu = () => {
    return (
      <Menu>
        <Item>
          Enviar por correo
        </Item>
        <Item>
          Cancelar factura
        </Item>
      </Menu>
    );
  };

  return (
    <div className={`${baseClass}`}>
      <Icon type="download" />
      <div className="more-menu-container">
        <Popover content={<MoreMenu />} placement="left">
          <Icon type="more" onClick={() => setMenuVisible('visible')} />
        </Popover>
      </div>
    </div>
  );
}

export default InvoicesAction;
