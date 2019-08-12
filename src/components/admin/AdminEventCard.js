import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

export default function AdminEventCard({
    title,
    startDate,
    location,
    mainImagesURLS,
    _id
}) {
    let { city, state } = location
    let regex = /^https?:\/\//
    let cover = mainImagesURLS[0]
    if (!mainImagesURLS[0] || !regex.test(mainImagesURLS[0])) cover = "https://www.riotgames.com/darkroom/1440/b2b587d91d3c5d2922953ac62fbb2cb8:dfd0d5c2d07f981fb8cda29623b5e54e/paris.jpg"
    return (
        <Link to={`/admin/events/edit/${_id}`}>
            <div style={{ backgroundImage: `url('${cover}')` }} className="admin-event-square-card">
                <h3>{title}</h3>
                <p>{`${city}, ${state}`}</p>
                <p>{moment(startDate).format('LL')}</p>
            </div>
        </Link>
    )
}