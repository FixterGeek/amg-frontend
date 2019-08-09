import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import * as usersActions from '../../store/ducks/users'


const UsersPage = (props) => {    
    const {users, usersLoading} = props
    useEffect(()=>{
        const query = JSON.stringify({userStatus:'Aprobado'})
        props.usersActions.getUsers(`?query=${query}&limit=${0}&skip=${0}`)
        
    },[])    
    console.log(users, usersLoading)
    return (
        <>            
            <div>
                {usersLoading && <p>Loading...</p>}
                {users.map((user, key)=>(
                    <p key={key}>{user.email}-{user.createdAt}</p> 
                ))}
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
