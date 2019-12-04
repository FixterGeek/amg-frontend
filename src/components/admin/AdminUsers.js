import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import toFormData from 'object-to-formdata';

import AdminUsersList from './AdminUsersList';
import {
    getUsers, deleteUserAction,
    updateUser
} from '../../store/ducks/users'
import Button from '../reusables/Button';
import Spinner from '../reusables/Spinner';

function AdminUsers({
    getUsers, deleteUserAction, good = 0, bad = 0,
    fetching, updateUser, userType, history
}) {

    useEffect(() => {
        getUsers()
        if (userType !== 'Admin') history.push('/admin');
    }, [])

    const handleUserActivate = (status, user) => {
        const excludeKeys = [
            'assistedActivities', 'assistedEvents', 'consultories',
            'courseOrders', 'enrolledActivities', 'enrolledCourses',
            'eventOrders', 'followers', 'following',
            'hospitalActivities', 'internships', 'medicalSocieties',
            'membersWhoRecommend', 'renewals', 'residencies',
            'studies', 'teachingActivities', 'workedAtInstitutions',
        ]
        user.userStatus = status;
        Object.keys(user).map(key => {
            if (excludeKeys.includes(key)) delete user[key];
        })
        updateUser(user);
    };

    return (
        <section>
            { fetching && <Spinner fullScrren /> }
            <article className="admin-main-header">
                <h1>Listado de socios</h1>
                <Button width="200px" line>
                    Generar reporte
                </Button>
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
                <AdminUsersList
                    deleteAction={deleteUserAction}
                    onActive={handleUserActivate}
                />
            </article>

        </section>
    )
}

function mapState({ users, user }) {
    return {
        good: users.array.filter(u => (u.membershipStatus === 'Socio' || u.membershipStatus === 'Residente') && u.userStatus === 'Aprobado').length,
        bad: users.array.filter(u => u.membershipStatus === 'Free' || u.userStatus === 'Registrado').length,
        fetching: users.fetching,
        userType: user.userType,
    }
}

export default connect(
    mapState, {
        getUsers,
        deleteUserAction,
        updateUser,
    })(AdminUsers)