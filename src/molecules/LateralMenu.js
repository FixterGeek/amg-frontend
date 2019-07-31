import React, { useEffect, useState , createRef } from 'react';
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
} from '@fortawesome/free-solid-svg-icons';

import { Menu, Icon } from 'antd';

import useAmgService from '../hooks/services/useAmgService';
import { createUser } from '../store/actions';

function LateralMenu({ history, user, dispatch }) {
  const [state, setState] = useState({ anchor: createRef() });
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

  const toMagazine = () => {
    state.anchor.current.click();
  };


  return (
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
      <Menu.Item key={3} onClick={() => toMagazine()}>
        <Icon>
          <FontAwesomeIcon icon={faBookOpen} />
        </Icon>
        <span>Revista</span>
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
      <a href="http://www.revistagastroenterologiamexico.org/?codref=ddh3dk3Yjdsafg503zSInMNxBdsddsa545vs809jdn02nubHHtJufRpNPu3hjd673&py=7jb39db3"
        target="_blanck" 
        style={{ display: 'none' }}
        ref={state.anchor}/>
    </Menu>
  );
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default withRouter(connect(mapStateToProps)(LateralMenu));
