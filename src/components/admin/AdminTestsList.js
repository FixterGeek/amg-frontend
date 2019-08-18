import React from 'react'
import AdminTestCard from './AdminTestCard';

const AdminTestsList = ({tests}) => {
    return (
        <div>
            {tests.map((t, key)=>(
                <AdminTestCard
                key={key}
                {...t}                
            />
            ))}
        </div>
    )
}

export default AdminTestsList
