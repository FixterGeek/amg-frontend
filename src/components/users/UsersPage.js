import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import * as usersActions from '../../store/ducks/users'
import UsersList from './UsersList';
import UsersSummaryCard from './UsersSummaryCard';
import UsersFilters from './UsersFilters';
import UsersPaginator from './UsersPaginator';


const UsersPage = (props) => {    
    const {users, usersLoading} = props
    useEffect(()=>{
        const query = JSON.stringify({userStatus:'Aprobado'})
        props.usersActions.getUsers()        
    },[])        
    return (
        <>
            <div className="admin-event-form-container">
                <h1>Listado de Socios</h1>
                <div style={{display:'flex', justifyContent:'center'}}>
                    <UsersSummaryCard
                        title="Membresías al Corriente"
                        number="1200"
                        colorClass="blue"
                    />
                    <UsersSummaryCard
                        title="Pendientes de Pago"
                        number="610"
                        colorClass="orange"
                    />
                </div>
                <UsersFilters/>
                {usersLoading && <p>Loading...</p>}
                <UsersList users={users}/>                    
                <UsersPaginator/>
            </div>             
        </>
    )
}

const mapStateToProps=(state, ownProps)=>{
    return{
        users:state.users.data,
        usersLoading:state.users.fetching
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        usersActions:bindActionCreators(usersActions,dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage)
