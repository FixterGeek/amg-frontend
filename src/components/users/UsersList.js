import React from 'react'



const UsersList = ({users=[]}) => {    
    return (
        <div className="users-table">                        
            <div className="columns">
                <span>Nombre</span>
                <span>Especialidad</span>
                <span>Rango</span>
                <span>Estatus de Membresía</span>
                <span>Acciones</span>
            </div>
            {users.map((user, key)=>(
                <p key={key} className="rows">
                    <span>{user.basicData.name} {user.basicData.momSurname}</span>
                    <span>{user.basicData.speciality}</span>
                    <span>{user.basicData.memershipStatus}</span>
                    <span></span>
                    <span>...</span>
                </p> 
            ))}
        </div>  
    )
}

export default UsersList
