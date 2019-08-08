import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux';
import * as usersActions from '../../redux/users/actions'


const Admin = (props) => {
    console.log(props)
    const {users} = props
    useEffect(()=>{
        const query = JSON.stringify({userStatus:'Registrado'})
        props.usersActions.getAllUsers(`?query=${query}&limit=${0}&skip=${0}`)        
    },[])
    console.log(users)
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
                        <span>
                            Oswaldinho Martínez Anaya
                        </span>
                        <span>
                            Solicitud creada: <br/>
                            10/10/10
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps=(state, ownProps)=>{
    return{
        users:state.users
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        usersActions:bindActionCreators(usersActions,dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
