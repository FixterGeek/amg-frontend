import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

export default function AdminTestCard({title, date, beginingTime, endTime, _id, event, removeTest}) {    
    let cover ="https://firebasestorage.googleapis.com/v0/b/amgweb.appspot.com/o/reusables%2Fdefault-test.jpeg?alt=media&token=bdfd1cbb-9653-4a3c-ae7b-c94eeb06bb77"
    if(event && event.mainImagesURLS && event.mainImagesURLS[0]) cover = event.mainImagesURLS[0]
    return (
        <Link to={`/admin/tests/edit/${_id}`}>
            <div style={{ backgroundImage: `url('${cover}')` }} className="admin-event-square-card test-hover">
                {/* <div className="buttons">
                    <span onClick={()=>removeTest(_id)}><FontAwesomeIcon icon={faTrash} /> Eliminar</span>
                </div> */}
                <div className="text-card-content">
                    <h3>{title}</h3>                
                    <p>{moment(date).format('LL')}{moment(beginingTime).format('LL')} {moment(endTime).format('LL')}</p>
                </div>
            </div>
        </Link>
    )
}