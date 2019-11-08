import React from 'react';

import { Icon, Popover, Menu, Popconfirm } from 'antd';

function ActionMenu({ dispatchDelete, record }) {
  const { Item } = Menu;
  const MenuContent = (
   <Menu className="reusables-subsidiary-menu-action-menu">
     <Item>
       <spa>Ver miembros</spa>
     </Item>
    <Item>
      <Popconfirm
        title={`¿Eliminal la filial de ${record.state}?`}
        okText="SI"
        cancelText="NO"
        onConfirm={() => dispatchDelete(record)}
      >
        <spa>Eliminar</spa>
      </Popconfirm>
    </Item>
   </Menu>
    // <div>
    //   <p>Solicitar facturas</p>
    //   <p>Enviar mensaje privado</p>
    //   <p>Ver miembros</p>
    // </div>
  );

  return (
    <Popover content={MenuContent} placement="left" className="reusables-subsidiary-menu-action">
      <Icon type="more"/>
    </Popover>
  );
}

export default ActionMenu;
