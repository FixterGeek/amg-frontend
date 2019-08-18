import React from 'react'
import AdminTestCard from './AdminTestCard';

const AdminTestsList = ({tests, removeTest}) => {
    return (
        <div className="admin-event-card-container">
            {tests.map((t, key)=>(
                <AdminTestCard
                key={key}
                removeTest={removeTest}
                {...t}                
            />
            ))}
        </div>
    )
}

export default AdminTestsList
