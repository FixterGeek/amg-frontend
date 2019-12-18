import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import jsPDF from 'jspdf';

import { Table } from 'antd';

import useSweet from '../../hooks/useSweetAlert';
import Spinner from '../reusables/Spinner';
import { getBlob } from '../../tools/fileToURL';

import { getSelfUser } from '../../services/userServices';

function ConstanciesTable({
  fetching, userId,
  userName,
}) {
  const { errorAlert } = useSweet();

  const [events, setEvents] = useState([]);

  const certificateGenerator = (image, name, userName) => {
    if (image) getBlob(image).then((blob) => {
      const { base64 } = blob;
      const doc = new jsPDF({
        orientation: 'landscape',
      })
      const w = doc.internal.pageSize.getWidth();
      const h = doc.internal.pageSize.getHeight();

      doc.addImage(base64, 'JPEG', 0, 0, w, h);
      doc.setFontSize(28);
      doc.setFont('Helvetica');
      doc.setFontType('italic');
      doc.text(w/2, (h/2) - 19, userName, null, null, 'center');
      doc.save(name);
    });
  };

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
          <a onClick={() => certificateGenerator(r.constanciasURLS[0], r.title, userName)}>
            Descargar constancia
          </a>
        )
        return (<span>Constancia no disponible</span>)
      }
    }
  ];

  useEffect(() => {
    getSelfUser()
      .then((data) => {
        setEvents(data.assistedEvents);
      })
      .catch((error) => {
        errorAlert({ text: 'No fue posible recuperar tus constancias' })
      })
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
    userName: `${user.basicData.name} ${user.basicData.dadSurname} ${user.basicData.momSurname || ''}`
  }
}

export default connect(
  mapStateToProps, null
)(ConstanciesTable);
