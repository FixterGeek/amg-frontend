import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { Typography } from 'antd';

import { getAllUsers } from '../../store/ducks/users';
import { getAdminEvents } from '../../store/ducks/eventsDuck';
import ContainerItem from '../reusables/ContainerItem';
import AdminNotoficationsPanel from './reusables/AdminNotificationsPanel';
import StatContainer from './reusables/StatsContainer';
import Pie from './reusables/Pie';
import SmallBoxItem from '../reusables/SmallBoxItem';
import Spinner from '../reusables/Spinner';

function AdminDashboard({
  users, currents, slopes,
  event = { assistants: [] }, fetching,
  getAdminEvents,
  getAllUsers,
}) {
  const { Title, Text } = Typography;

  useEffect(() => {
    getAllUsers();
    getAdminEvents();
  }, []);

  return (
    <section className="admin-dashboard">
      { fetching && <Spinner fullScrren /> }
      <ContainerItem>
        <Title>Inicio</Title>
      </ContainerItem>
      <ContainerItem>
        <Title level={4}>{ event.title || '' }</Title>
        <StatContainer
          title="Miembros inscritos"
          stats={event.assistants.length || 0}
        />
      </ContainerItem>
      <Title level={4}>Miembros</Title>
      <ContainerItem className="admin-dashboard-graphs">
        <div>
          <StatContainer
            title="Membresía al corriente"
            stats={`${currents.length}`}
          />
          <StatContainer
            title="Pendientes de pagar"
            stats={`${slopes.length}`}
            style={{ backgroundColor: '#fa6400' }}
          />
        </div>
        <div>
          <Pie data={[
            { name: 'al corriente', stat: currents.length },
            { name: 'pendientes', stat: slopes.length },
          ]} />
        </div>
      </ContainerItem>
      <ContainerItem>
        <Title level={4}>Últimas afiliaciones</Title>
        {
          currents.reverse().slice(0, 10).map(u => (
            <SmallBoxItem
              key={u._id}
              title={`${u.basicData.name} ${u.basicData.dadSurname}`}
              rigth={`${moment(u.revisionDate).format('dddd[ ]DD[ de ]MMMM[ de ]YYYY')}`}
              to={`/admin/users/${u._id}`}
            />
          ))
        }
      </ContainerItem>
      <AdminNotoficationsPanel slopes={slopes} />
    </section>
  );
}

function mapStateToProps({ users, events }) {
  let tmp = 365;
  let event = { assistants: [] };
  events.array.map(e => {
    if (e.status === 'published') {
      const diffDays = moment().diff(moment(e.startDate), 'days');
      if (diffDays < tmp) {
        tmp = diffDays;
        event = e;
      }
    }
  });

  return {
    users,
    currents: users.array.filter(u => (u.membershipStatus === 'Socio' || u.membershipStatus === 'Residente') && u.userStatus === 'Aprobado'),
    slopes: users.array.filter(u => u.membershipStatus === 'Free' || u.userStatus === 'Registrado'),
    event,
    fetching: users.fetching || events.fetching,
  };
}

export default connect(
  mapStateToProps, {
    getAllUsers,
    getAdminEvents,
  }
)(AdminDashboard);
