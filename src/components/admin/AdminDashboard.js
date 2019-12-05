import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { Typography } from 'antd';

import { getAllUsers } from '../../store/ducks/users';
import { getAdminEvents } from '../../store/ducks/eventsDuck';
import { populateSubsidiaries } from '../../store/ducks/subsidiaryDuck';
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
  getAllUsers, user,
  populateSubsidiaries,
}) {
  const { Title, Text } = Typography;

  useEffect(() => {
    populateSubsidiaries();
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
            { name: 'Al corriente', stat: currents.length },
            { name: 'Pendientes', stat: slopes.length },
          ]} />
        </div>
      </ContainerItem>
      {
        !user.filialAsAdmin && (
          <ContainerItem>
            <Title level={4}>Últimas afiliaciones</Title>
            {
              users.reverse().slice(0, 10).map(u => (
                <SmallBoxItem
                  key={u._id}
                  title={`${u.basicData.name} ${u.basicData.dadSurname}`}
                  rigth={`${moment(u.createdAt).format('dddd[ ]DD[ de ]MMMM[ de ]YYYY')}`}
                  to={`/admin/users/${u._id}`}
                />
              ))
            }
          </ContainerItem>
        )
      }
      <AdminNotoficationsPanel slopes={slopes.reverse()} user={user} />
    </section>
  );
}

function mapStateToProps({ users, events, user, subsidiary }) {
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

  let usersForFilial = null;

  if (user.filialAsAdmin) {
    const sub = subsidiary.array.filter(s => s._id === user.filialAsAdmin).pop();
    if (sub) usersForFilial = users.array.filter(u =>
      u.filialAsUser === sub._id || u.address.state === sub.state || u.basicData.address.state === sub.state
    )
  }

  const iterable = usersForFilial || users.array;

  return {
    user,
    users: iterable,
    currents: iterable.filter(u => (u.membershipStatus === 'Socio' || u.membershipStatus === 'Residente') && u.userStatus === 'Aprobado'),
    slopes: iterable.filter(u => u.membershipStatus === 'Free' || u.userStatus === 'Registrado'),
    event,
    fetching: users.fetching || events.fetching || subsidiary.fetching,
  };
}

export default connect(
  mapStateToProps, {
    getAllUsers,
    getAdminEvents,
    populateSubsidiaries,
  }
)(AdminDashboard);
