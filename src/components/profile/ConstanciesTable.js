import React, { useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import { Table } from 'antd';

import Spinner from '../reusables/Spinner';

import {
  populateUserEventsAction
} from '../../store/ducks/eventsDuck';

function ConstanciesTable({
  events, fetching, userId,
  populateUserEventsAction,
}) {
  const columns = [
    {
      title: 'Evento',
      dataIndex: 'title'
    },
    {
      title: 'Fecha',
      render: (t, r) => (
        <span>{`${moment(r.startDate).format('DD/MM/YYYY')} - ${moment(r.endDate).format('DD/MM/YYYY')}`}</span>
      ),
    },
    {
      title: 'Constancia',
      render: (t, r) => {
        if (moment().isAfter(moment(r.endDate))) return (
          <a href={r.constanciasURLS[0]} target="_blank">
            Descargar constancia
          </a>
        )
        return (<span>Constancia no disponible</span>)
      }
    }
  ];

  useEffect(() => {
    populateUserEventsAction(userId);
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      { fetching && <Spinner /> }
      <Table
        columns={columns}
        dataSource={events}
        rowKey="_id"
        locale={{ emptyText: 'No hay constancias disponibles.' }}
      />
    </div>
  );
}

function mapStateToProps({ events, user }) {
  return {
    events: events.userEvents,
    fetching: events.fetching,
    userId: user._id,
  }
}

export default connect(
  mapStateToProps, {
    populateUserEventsAction,
  }
)(ConstanciesTable);
