import React from 'react'

const UsersSummaryCard = ({title, number, colorClass}) => {
    return (
        <div className={`summary-card ${colorClass}`}>
            <span className="title">{title}</span>
            <span className="number">{number}</span>
        </div>
    )
}

export default UsersSummaryCard
