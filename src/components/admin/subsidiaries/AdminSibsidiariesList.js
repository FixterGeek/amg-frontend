import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Tabs, Icon, Table, Input } from 'antd';

import {
  deletedSubsidiary,
  populateSubsidiaries,
} from '../../../store/ducks/subsidiaryDuck';
import {
  getAllUsers
} from '../../../store/ducks/users';
import ActionMenu from './reusables/ActionMenu';
import ChecboxField from '../../reusables/CheckboxField';
import Spinner from '../../reusables/Spinner';
import zones from './zones.json';


function AdminSubsidiariesList({
  subsidiaries, deletedSubsidiary,
  populateSubsidiaries, fetching,
  noSubsidiaries, getAllUsers,
  users,
}) {
  const { TabPane } = Tabs;
  const { Search } = Input;

  const columns = [
    {
      title: 'Razón social',
      dataIndex: 'state',
      render: (text, record) => (
        <Link to={{ pathname: `/admin/filiales/${record._id}`, state: record }}>
          { record.state }
        </Link>
      )
    },
    {
      title: 'Zona',
      render: (t, r) => {
        let z = null;
        if (zones['ZONA CENTRO'].includes(r.state)) z = 'Zona Centro';
        if (zones['ZONA NORTE'].includes(r.state)) z = 'Zona Norte';
        if (zones['ZONA SUR'].includes(r.state)) z = 'Zona Sur';
        return <span>{z}</span>
      }
    },
    {
      title: 'Administradores',
      render: (t, r) => {
        const admins = r.administrators.map(a => `${a.basicData.name} ${a.basicData.dadSurname}`)
        return (
          <span>{admins.join()}</span>
        );
      }
    },
    {
      title: 'Miembros asignados',
      dataIndex: 'members',
      render: (text, record) => (
        <span>{
          users.filter(u =>
            u.address.state === record.state || u.filialAsUser === record._id || u.basicData.address.state === record.state).length
        }</span>
      ),
    },
    {
      title: 'Acciones',
      render: (t, r) => (<ActionMenu record={r} dispatchDelete={deletedSubsidiary} />),
    },
  ]

  const [filtereds, setFiltered] = useState(null);

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (!subsidiaries[0] && !noSubsidiaries) populateSubsidiaries();
  }, [subsidiaries.length]);

  const handleSearch = (value) => {
    const regex = new RegExp(value, 'i');
    const f = subsidiaries.filter( s => regex.test(s.state));
    setFiltered(f);
  }

  const handleFilter = filter => {
    const f = subsidiaries.filter(s => {
      if (!filter[0]) return true;
      if (zones[`${filter[0]}`.toUpperCase()].includes(s.state)) return true;
      return false;
    })

    setFiltered(f);
  }

  return (
    <div className="generic-admin-table admin-subsidiaries-list">
      {
        fetching && <Spinner fullScrren />
      }
      <Tabs type="card" className="generic-table-header">
        <TabPane tab={<Icon type="search" />} key="1">
          <div className="finder">
            <Search
              onChange={({ target }) => handleSearch(target.value)}
              placeholder="Ingresa el nombre de la filial"
            />
          </div>
        </TabPane>
        <TabPane tab={<Icon type="filter" />} key="2">
          <div className="filters-container">
            <ChecboxField
              onChange={f => handleFilter(f)}
              label="Zona:"
              containerClassName="filters"
              checks={['Zona Centro', 'Zona Norte', 'Zona Sur']}
              sameValue
              onlyOne
            />
          </div>
        </TabPane>
      </Tabs>
      <Table
        columns={columns}
        dataSource={filtereds || subsidiaries}
        locale={{ emptyText: 'Sin filiales' }}
        pagination={{ pageSize: 20 }}
        rowKey="_id"
      />
    </div>
  )
}

function mapSateToProps({ subsidiary, users }) {
  return {
    subsidiaries: subsidiary.array,
    fetching: users.fetching,
    noSubsidiaries: subsidiary.noData,
    users: users.array,
  };
}

export default connect(
  mapSateToProps, {
    deletedSubsidiary,
    populateSubsidiaries,
    getAllUsers,
  }
)(AdminSubsidiariesList);
