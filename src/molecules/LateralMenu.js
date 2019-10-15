/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useEffect, useState, createRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPowerOff,
  faCog,
} from '@fortawesome/free-solid-svg-icons';

import { Menu, Icon } from 'antd';

import { 
  HomeIcon, EventIcon, MagazineIcon, SourcesIcon, ProfileIcon
} from '../components/feed/reusables/Icons';
import { logoutAction } from '../store/ducks/userDuck';

function LateralMenu({ history, user, populateUserAction, logoutAction }) {
  const [state] = useState({ anchor: createRef() });
  const { Item } = Menu;
  // eslint-disable-next-line react/prop-types
  const { location } = history;
  const locationSplit = location.pathname.split('/');
  const currentLocation = locationSplit[2];


  useEffect(() => {
    if (!user._id) {
      // populateUserAction().catch(() => errorAlert());
    }
  }, [user._id, populateUserAction]);


  const link = (to) => {
    history.push(to);
  };

  const toMagazine = () => {
    state.anchor.current.click();
  };


  return (
    <Menu inlineCollapsed defaultSelectedKeys={['1']} mode="inline">
      <Item key={1} onClick={() => link('/dashboard/')}>
        <Icon
          className={`${!currentLocation ? 'menu-item-active' : ''}`}
          component={HomeIcon}
        />
        <span>Home</span>
      </Item>
      <Item key={2} onClick={() => link('/dashboard/events')}>
        <Icon
          className={`${currentLocation === 'events' ? 'menu-item-active' : ''}`}
          component={EventIcon}
        />
        <span>Eventos</span>
      </Item>
      <Item key={3} onClick={() => toMagazine()}>
        <Icon component={MagazineIcon} />
        <span>Revista</span>
      </Item>
      <Item key={4} onClick={() => link('/dashboard/recursos')}>
        <Icon component={SourcesIcon} />
        <span>Recursos</span>
      </Item>
      <Item key={5} onClick={() => link('/dashboard/perfil')}>
        <Icon 
          className={`${currentLocation === 'perfil' ? 'menu-item-active' : ''}`}
          component={ProfileIcon}
        />
        <span>Mi perfil</span>
      </Item>
      <Item key={6} onClick={() => link('/dashboard/settings')}>
        <Icon className={`${currentLocation === 'settings' ? 'menu-item-active' : ''}`}>
          <FontAwesomeIcon icon={faCog} />
        </Icon>
        <span>Configuración</span>
      </Item>
      <Item
        key={7}
        onClick={() => logoutAction().then(() => history.push('/'))}
        style={{ position: 'absolute', bottom: '32px'  }} >
        <Icon>
          <FontAwesomeIcon icon={faPowerOff} />
        </Icon>
        <span>Salir</span>
      </Item>
      <a
        href="http://www.revistagastroenterologiamexico.org/?codref=ddh3dk3Yjdsafg503zSInMNxBdsddsa545vs809jdn02nubHHtJufRpNPu3hjd673&py=7jb39db3"
        target="_blanck"
        style={{ display: 'none' }}
        ref={state.anchor} />
    </Menu>
  );
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default withRouter(connect(mapStateToProps, { logoutAction })(LateralMenu));
