import React from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPowerOff,
  faHome,
  faCalendar,
  faFileInvoiceDollar,
  faUsers
} from "@fortawesome/free-solid-svg-icons";

import { Menu, Icon } from "antd";

import useAmgService from "../hooks/services/useAmgService";

function LateralAdminMenu(props) {
  // eslint-disable-next-line react/prop-types
  const { history } = props;
  const { location } = history;
  const locationSplit = location.pathname.split("/");
  const currentLocation = locationSplit[2];

  const { logout } = useAmgService();

  const link = to => {
    history.push(to);
  };

  console.log(currentLocation);

  return (
    <Menu inlineCollapsed defaultSelectedKeys={["1"]} mode="inline">
      <Menu.Item key={1} onClick={() => link("/admin/")}>
        <Icon className={`${!currentLocation ? "menu-item-active" : ""}`}>
          <FontAwesomeIcon icon={faHome} />
        </Icon>
        <span>Home</span>
      </Menu.Item>
      <Menu.Item key={2} onClick={() => link("/admin/events")}>
        <Icon className={`${!currentLocation ? "menu-item-active" : ""}`}>
          <FontAwesomeIcon icon={faCalendar} />
        </Icon>
        <span>Eventos</span>
      </Menu.Item>
      <Menu.Item key={3} onClick={() => link("/admin/pays")}>
        <Icon className={`${!currentLocation ? "menu-item-active" : ""}`}>
          <FontAwesomeIcon icon={faFileInvoiceDollar} />
        </Icon>
        <span>Pagos</span>
      </Menu.Item>
      <Menu.Item key={4} onClick={() => link("/admin/users")}>
        <Icon className={`${!currentLocation ? "menu-item-active" : ""}`}>
          <FontAwesomeIcon icon={faUsers} />
        </Icon>
        <span>Usuarios</span>
      </Menu.Item>
      <Menu.Item key={5} onClick={() => logout(history)}>
        <Icon>
          <FontAwesomeIcon icon={faPowerOff} />
        </Icon>
        <span>Salir</span>
      </Menu.Item>
    </Menu>
  );
}

export default withRouter(LateralAdminMenu);
