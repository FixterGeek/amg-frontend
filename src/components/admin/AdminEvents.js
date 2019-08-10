import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminEvents() {
    return (
        <>
            <Link to="/admin/events/edit">
                <button>Nuevo evento</button>
            </Link>
        </>
    )
}