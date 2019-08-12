/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useEffect, useState, createRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPowerOff,
    faHome,
    faCalendar,
    faBell,
    faUsers,
    faFileInvoiceDollar
} from '@fortawesome/free-solid-svg-icons';

import { Menu, Icon } from 'antd';

import useSweetAlert from '../../hooks/useSweetAlert';
// import { populateUserAction } from '../store/ducks/userDuck';

function LateralMenu({ history, user, populateUserAction }) {
    const { errorAlert } = useSweetAlert();
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
        <Menu
            style={{ height: "100vh" }}
            inlineCollapsed defaultSelectedKeys={['1']} mode="inline">
            <Item key={1} onClick={() => link('/admin/')}>
                <Icon className={`${currentLocation ? null : 'menu-item-active'}`}>
                    <FontAwesomeIcon icon={faHome} />
                </Icon>
                <span>Home</span>
            </Item>
            <Item key={2} onClick={() => link('/admin/events')}>
                <Icon
                    className={
                        currentLocation === 'events' ? 'menu-item-active' : ''
                    }
                >
                    <FontAwesomeIcon icon={faCalendar} />
                </Icon>
                <span>Eventos</span>
            </Item>
            <Item key={3} onClick={() => link('/admin/events')}>
                <Icon
                    className={
                        currentLocation === 'facturas' ? 'menu-item-active' : ''
                    }
                >
                    <FontAwesomeIcon icon={faFileInvoiceDollar} />
                </Icon>
                <span>Facturas</span>
            </Item>
            <Item key={4} onClick={() => link('/admin/users')} >
                <Icon
                    className={currentLocation === 'users' ? 'menu-item-active' : ''}
                >
                    <FontAwesomeIcon icon={faUsers} />
                </Icon>
                <span>Socios</span>
            </Item>
            <Item key={4}>
                <Icon
                    className={currentLocation === 'biblioteca' ? 'menu-item-active' : ''}
                >
                    <FontAwesomeIcon icon={faBell} />
                </Icon>
                <span>Biblioteca</span>
            </Item>
            <Item key={7} onClick={() => { }}>
                <Icon
                    className={
                        currentLocation === 'logout' ? 'menu-item-active' : ''
                    }
                >
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

export default withRouter(connect(mapStateToProps)(LateralMenu));
