import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import * as usersActions from '../../store/ducks/users'


const Admin = (props) => {    
    const {users, usersLoading} = props
    useEffect(()=>{
        const query = JSON.stringify({userStatus:'Pendiente'})
        props.usersActions.getUsers(`?query=${query}&limit=${0}&skip=${0}`)
        
    },[])    
    console.log(users, usersLoading)
    return (
        <>
            <h2>Miembros</h2>
            <div>
                <p>Semana nacional</p>
                <div>
                    <p>Miembros inscritos</p>
                    <span>1200</span>
                </div>
                <p>Miembros</p>
                <div>
                    <p>Miembros inscritos</p>
                    <span>1200</span>
                </div>
                <div>
                    <p>Miembros inscritos</p>
                    <span>1200</span>
                </div>
                <div>
                    la gráfica
                </div>
            </div>

            <div>
                <h2>Afiliaciones</h2>
                <div>
                    <div>
                        {usersLoading && <p>Loading...</p>}
                        {users.map((user, key)=>(
                            <p key={key}>{user.email}-{user.createdAt}</p> 
                        ))}
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
