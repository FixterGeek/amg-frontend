/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useEffect, useState, createRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPowerOff,
    faCalendar,
    faUsers,
    faFileInvoiceDollar,
    faFileAlt,
    faArrowCircleLeft
} from '@fortawesome/free-solid-svg-icons';

import { Menu, Icon } from 'antd';

import { SourcesIcon, EventIcon, MapIcon, HomeIcon } from '../feed/reusables/Icons';
import useSweetAlert from '../../hooks/useSweetAlert';
import { logoutAction } from '../../store/ducks/userDuck';
// import { populateUserAction } from '../store/ducks/userDuck';

function LateralMenu({ history, user, populateUserAction, logoutAction }) {
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

    const logOut = () => {
        logoutAction();
        history.push('/');
    }


    return (
        <Menu
            style={{ height: "100vh", overflowX: 'hidden' }}
            inlineCollapsed mode="inline" theme="dark" className="admin-lateral-menu">
            <Item key={1} onClick={() => link('/admin/dashboard')}>
                <Icon
                    component={HomeIcon}
                    className={`${currentLocation === 'dashboard' ? 'menu-item-active' : 'menu-item-inactive'}`}
                />
                <span>Home</span>
            </Item>
            {
                user.userType === 'Admin' && (
                    <Item key={2} onClick={() => link('/admin/events')}>
                        <Icon
                            component={EventIcon}
                            className={ currentLocation === 'events' || currentLocation === 'eventos' ? 'menu-item-active' : '' }
                        />
                        <span>Eventos</span>
                    </Item>
                )
            }
            {
                user.userType === 'Admin' && (
                    <Item key={3} onClick={() => link('/admin/invoices')}>
                        <Icon className={ currentLocation === 'invoices' ? 'menu-item-active' : '' }>
                            <FontAwesomeIcon icon={faFileInvoiceDollar} />
                        </Icon>
                        <span>Facturas</span>
                    </Item>
                )
            }
            {
                user.userType === 'Admin' && (
                    <Item key={4} onClick={() => link('/admin/users')} >
                        <Icon className={currentLocation === 'users' ? 'menu-item-active' : ''} >
                            <FontAwesomeIcon icon={faUsers} />
                        </Icon>
                        <span>Socios</span>
                    </Item>
                )
            }
            {
                user.userType === 'Admin' && (
                    <Item key={6} onClick={() => link('/admin/tests')} >
                        <Icon className={currentLocation === 'tests' ? 'menu-item-active' : ''}>
                            <FontAwesomeIcon icon={faFileAlt} />
                        </Icon>
                        <span>Tests</span>
                    </Item>
                )
            }
            {
                user.userType === 'Admin' && (
                    <Item key={7} onClick={() => link('/admin/resources')}>
                        <Icon component={SourcesIcon} />
                        <span>Recursos</span>
                    </Item>
                )
            }
           
            <Item
                key={8}
                onClick={
                    () => link(user.filialAsAdmin ? `/admin/filiales/${user.filialAsAdmin}` :'/admin/filiales')
                }
            >
                <Icon
                    className={currentLocation === 'filiales' ? 'menu-item-active' : ''}
                    component={MapIcon}
                    style={{ marginLeft: '16px' }}
                />
                <span>Filiales</span>
            </Item>
            {/* {
                user.filialAsAdmin && (
                    <Item key={9} onClick={() => link(`/admin/filiales/${user.filialAsAdmin}/pagos`)}>
                        <Icon className={currentLocation === 'pagos' ? 'menu-item-active' : ''}>
                            <FontAwesomeIcon icon={faFileInvoiceDollar} />
                        </Icon>
                        <span>Historial de pagos</span>
                    </Item>
                )
            } */}
            <Item
                key={10}
                onClick={() => link('/dashboard')}>
                <Icon >
                    <FontAwesomeIcon icon={faArrowCircleLeft} />
                </Icon>
                <span>Ir al dashboard</span>
            </Item>
            <Item
                key={11}
                onClick={() => logOut()}
                style={{ position: 'absolute', bottom: '16px' }}>
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
                ref={state.anchor}
            />
        </Menu>
    );
}

function mapStateToProps(state) {
    return { user: state.user };
}

export default withRouter(
    connect(
        mapStateToProps, {
            logoutAction,
        }
    )(LateralMenu));
