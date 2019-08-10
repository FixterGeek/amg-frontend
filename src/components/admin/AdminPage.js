import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as usersActions from '../../store/ducks/users'
import AdminMenu from './AdminMenu'
import AdminRouter from './AdminRouter';


function Admin({ users, usersLoading }) {
    return (
        <div className="admin-page-container">
            <section className="admin-page-menu-container" >
                <AdminMenu />
            </section>

            <AdminRouter />
        </div >
    )
}

function mapState({ users }) {
    return {
        users: users.data,
        usersLoading: users.fetching
    }
}


export default connect(mapState, {})(Admin)


// useEffect(() => {
    //     //const query = JSON.stringify({ userStatus: 'Pendiente' })
    //     // props.usersActions.getUsers(`?query=${query}&limit=${0}&skip=${0}`)

    // }, [])