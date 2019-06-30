import React from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPowerOff, faHome, faCalendar,
  faBookOpen,
} from '@fortawesome/free-solid-svg-icons';

import { Menu, Icon } from 'antd';

import useAmgService from '../hooks/services/useAmgService';

function LateralMenu(props) {
  console.log(props);
  // eslint-disable-next-line react/prop-types
  const { history } = props;
  const { logout } = useAmgService();

  return (
    <Menu
      inlineCollapsed
      defaultSelectedKeys={['1']}
      mode="inline">
      <Menu.Item key={1}>
        <Icon>
          <FontAwesomeIcon icon={faHome} />
        </Icon>
        <span>Home</span>
      </Menu.Item>
      <Menu.Item key={2}>
        <Icon>
          <FontAwesomeIcon icon={faCalendar} />
        </Icon>
        <span>Calendario</span>
      </Menu.Item>
      <Menu.Item key={3}>
        <Icon>
          <FontAwesomeIcon icon={faBookOpen} />
        </Icon>
        <span>Agenda</span>
      </Menu.Item>
      <Menu.Item key={4} onClick={() => logout(history)}>
        <Icon>
          <FontAwesomeIcon icon={faPowerOff} />
        </Icon>
        <span>Salir</span>
      </Menu.Item>
    </Menu>
  );
}

export default withRouter(LateralMenu);
