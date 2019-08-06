import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPowerOff,
  faHome,
  faCalendar,
  faBookOpen,
  faGraduationCap,
  faUser,
  faUsers,
  faFile
} from '@fortawesome/free-solid-svg-icons';

import { Menu, Icon } from 'antd';

import useAmgService from '../hooks/services/useAmgService';
import { createUser } from '../store/actions';

function LateralMenu({ history, user, dispatch }) {
  const { logout, getSelfUser } = useAmgService();
  // eslint-disable-next-line react/prop-types
  const { location } = history;
  const locationSplit = location.pathname.split('/');
  const currentLocation = locationSplit[2];


  useEffect(() => {
    if (!user.basicData.name) {
      getSelfUser().then(({ data }) => dispatch(createUser({ ...data })))
        .catch(({ response }) => console.log(response));
    }
  }, [dispatch, getSelfUser, user.basicData.name]);


  const link = (to) => {
    history.push(to);
  };

  return (
    <>
      {user.userType === 'Admin' ? 
      
      <Menu inlineCollapsed defaultSelectedKeys={['1']} mode="inline">             
        <Menu.Item key={1} onClick={() => link('/admin')}>
            <Icon className={`${!currentLocation ? 'menu-item-active' : ''}`}>
              <FontAwesomeIcon icon={faHome} />
            </Icon>
            <span>Home</span>
          </Menu.Item>
          <Menu.Item key={2} onClick={() => link('/dashboard/events')}>
            <Icon
              className={`${
                currentLocation === 'events' ? 'menu-item-active' : ''
              }`}
            >
              <FontAwesomeIcon icon={faCalendar} />
            </Icon>
            <span>Eventos</span>
          </Menu.Item>
          <Menu.Item key={3} onClick={() => link('/admin/tests')}>
            <Icon
              className={`${
                currentLocation === 'tests' ? 'menu-item-active' : ''
              }`}
            >
              <FontAwesomeIcon icon={faFile} />
            </Icon>
            <span>Tests</span>
          </Menu.Item>
          <Menu.Item key={4} onClick={() => link('/admin/users')}>
            <Icon
              className={`${
                currentLocation === 'users' ? 'menu-item-active' : ''
              }`}
            >
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
        :
        <Menu inlineCollapsed defaultSelectedKeys={['1']} mode="inline">             
        <Menu.Item key={1} onClick={() => link('/dashboard/')}>
            <Icon className={`${!currentLocation ? 'menu-item-active' : ''}`}>
              <FontAwesomeIcon icon={faHome} />
            </Icon>
            <span>Home</span>
          </Menu.Item>
          <Menu.Item key={2} onClick={() => link('/dashboard/events')}>
            <Icon
              className={`${
                currentLocation === 'events' ? 'menu-item-active' : ''
              }`}
            >
              <FontAwesomeIcon icon={faCalendar} />
            </Icon>
            <span>Eventos</span>
          </Menu.Item>
          <Menu.Item key={3}>
            <Icon>
              <FontAwesomeIcon icon={faBookOpen} />
            </Icon>
            <span>Agenda</span>
          </Menu.Item>
          <Menu.Item key={4}>
            <Icon>
              <FontAwesomeIcon icon={faGraduationCap} />
            </Icon>
            <span>Educación</span>
          </Menu.Item>
          <Menu.Item key={5} onClick={() => link('/dashboard/user')}>
            <Icon>
              <FontAwesomeIcon icon={faUser} />
            </Icon>
            <span>Mi perfil</span>
          </Menu.Item>
          <Menu.Item key={6} onClick={() => logout(history)}>
            <Icon>
              <FontAwesomeIcon icon={faPowerOff} />
            </Icon>
            <span>Salir</span>
          </Menu.Item>
        </Menu>
      }
    </>
    
  );
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default withRouter(connect(mapStateToProps)(LateralMenu));
