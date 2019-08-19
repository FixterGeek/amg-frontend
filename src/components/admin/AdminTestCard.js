import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

export default function AdminTestCard({title, date, beginingTime, endTime, _id, event, removeTest}) {    
    let cover ="https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823__340.jpg"
    if(event && event.mainImagesURLS && event.mainImagesURLS[0]) cover = event.mainImagesURLS[0]
    return (
        <Link to={`/admin/tests/edit/${_id}`}>
            <div style={{ backgroundImage: `url('${cover}')` }} className="admin-event-square-card test-hover">
                {/* <div className="buttons">
                    <span onClick={()=>removeTest(_id)}><FontAwesomeIcon icon={faTrash} /> Eliminar</span>
                </div> */}
                <h3>{title}</h3>                
                <p>{moment(date).format('LL')}{moment(beginingTime).format('LL')} {moment(endTime).format('LL')}</p>
            </div>
        </Link>
    )
}