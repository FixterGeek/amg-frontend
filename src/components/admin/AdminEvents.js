import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { getAdminEvents } from '../../store/ducks/eventsDuck'
import { emptyWorkingOn } from '../../store/ducks/adminDuck'
import AdminEventCard from './AdminEventCard';
import { Skeleton, Card } from 'antd'

function AdminEvents({
    getAdminEvents,
    activeEvents,
    inactiveEvents,
    fetching,
    emptyWorkingOn
}) {

    useEffect(() => {
        getAdminEvents()
        emptyWorkingOn()
    }, [])


    function drawCard(event, i) {
        return (
            <AdminEventCard
                key={i}
                {...event}
                event={event}
            />
        )

    }

    function loadingSkeleton() {
        return fetching && [1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(() => <Card style={{ width: 350, height: 315 }} > <Skeleton active /></Card>)

    }

    return (
        <section >
            <article className="admin-main-header" >
                <h1>Eventos</h1>
                <Link to="/admin/events/edit">
                    <button className="admin-main-button">Agregar evento</button>
                </Link>
            </article>


            <article>
                <div>
                    <h2>Activos</h2>
                    <div className="admin-event-card-container">
                        {loadingSkeleton()}
                        {activeEvents.map(drawCard)}
                    </div>
                </div>
                <div>
                    <h2>Inactivos</h2>
                    <div className="admin-event-card-container">
                        {loadingSkeleton()}
                        {inactiveEvents.map(drawCard)}
                    </div>
                </div>
            </article>
        </section>
    )
}

function mapState({ events }) {
    let activeEvents = events.array.filter(e => e.status === "published")
    let inactiveEvents = events.array.filter(e => e.status === "draft")
    console.log("activos", activeEvents)
    console.log("inactivos", inactiveEvents)
    return {
        activeEvents,
        inactiveEvents,
        fetching: events.fetching
    }
}

export default connect(mapState, { getAdminEvents, emptyWorkingOn })(AdminEvents)