import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import AdminMenu from './AdminMenu'
import AdminRouter from './AdminRouter';


function Admin({ history }) {
    useEffect(() => {
        const {location} = history;
        if (location.pathname === '/admin') history.push('/admin/dashboard');
    }, []);

    console.log(history);

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