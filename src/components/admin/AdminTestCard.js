import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

export default function AdminTestCard({title, date, beginingTime, endTime, mainImagesURLS, _id, event}) {    
    const cover ="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823__340.jpg"
    return (
        <Link to={`/admin/tests/edit/${_id}`}>
            <div style={{ backgroundImage: `url('${mainImagesURLS || cover}')` }} className="admin-event-square-card">
                <h3>{title}</h3>                
                <p>{moment(date).format('LL')}{moment(beginingTime).format('LL')} {moment(endTime).format('LL')}</p>
            </div>
        </Link>
    )
}