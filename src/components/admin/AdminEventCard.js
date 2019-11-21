import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { Popconfirm, Icon, Popover } from 'antd';

export default function AdminEventCard({
    title,
    startDate,
    location,
    mainImagesURLS,
    _id,
    deleteButton,
    dispatchDelete,
    eventId,
}) {
    let { city, state } = location
    let regex = /^https?:\/\//
    let cover = mainImagesURLS[0]
    if (!mainImagesURLS[0] || !regex.test(mainImagesURLS[0])) cover = "https://www.riotgames.com/darkroom/1440/b2b587d91d3c5d2922953ac62fbb2cb8:dfd0d5c2d07f981fb8cda29623b5e54e/paris.jpg"
    return (
        <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: '20px', right: '40px' }}>
            {
                deleteButton && (
                        <Popover placement="left" content={(
                            <Popconfirm style={{ color: 'red' }}
                            okText="SI"
                            cancelText="NO"
                            title={`¿Eliminar ${title}?`}
                            onConfirm={() => dispatchDelete ? dispatchDelete(eventId) : null}
                        >
                            <span style={{ cursor: 'pointer', color: 'red' }}>
                                Eliminar <Icon type="delete" />
                            </span>
                        </Popconfirm>
                    )}>
                        <Icon type="more" style={{ fontSize: '1.6rem', color: 'white' }} />
                    </Popover>
                )
            }
            </div>
            <Link to={`/admin/eventos/edit/${_id}`}>
                <div style={{ backgroundImage: `url('${cover}')` }} className="admin-event-square-card">
                    <h3>{title}</h3>
                    <p>{`${city}, ${state}`}</p>
                    <p>{moment(startDate).format('LL')}</p>
                </div>
            </Link>
        </div>
    )
}