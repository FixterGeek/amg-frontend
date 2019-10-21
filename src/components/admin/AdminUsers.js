import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import AdminUsersList from './AdminUsersList';
import { getUsers, deleteUserAction } from '../../store/ducks/users'

let good = 1200
let bad = 616

function AdminUsers({
    getUsers, deleteUserAction
}) {

    useEffect(() => {
        getUsers()
    }, [])

    return (
        <section>
            <article className="admin-main-header">
                <h1>Listado de socios</h1>
                <button className="admin-main-button">
                    Generar reporte
                </button>
            </article>
            <article className="admin-number-card-container">
                <div style={{ background: "#1f2536" }} className="admin-number-card">
                    <span>Membresías al corriente</span>
                    <span>{good}</span>
                </div>
                <div style={{ background: "#fa6400" }} className="admin-number-card">
                    <span>Pendientes de pagar</span>
                    <span>{bad}</span>
                </div>
            </article>

            <article className="admin-users-list-container">
                <AdminUsersList deleteAction={deleteUserAction} />
            </article>

        </section>
    )
}

function mapState(state) {
    return {}
}

export default connect(mapState, { getUsers, deleteUserAction })(AdminUsers)