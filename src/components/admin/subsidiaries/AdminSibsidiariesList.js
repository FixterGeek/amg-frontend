import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Tabs, Icon, Table, Input } from 'antd';

import {
  deletedSubsidiary,
  populateSubsidiaries,
} from '../../../store/ducks/subsidiaryDuck';
import ActionMenu from './reusables/ActionMenu';


function AdminSubsidiariesList({
  subsidiaries, deletedSubsidiary,
  populateSubsidiaries, fetching,
  noSubsidiaries,
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
      dataIndex: 'state',
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
      render: (text, record) => (<span>{ record.users.length }</span>),
    },
    {
      title: 'Acciones',
      render: (t, r) => (<ActionMenu record={r} dispatchDelete={deletedSubsidiary} />),
    },
  ]

  const [filtereds, setFiltered] = useState(null);

  useEffect(() => {
    if (!subsidiaries[0] && !noSubsidiaries) populateSubsidiaries();
  }, [subsidiaries.length]);

  const handleSearch = (value) => {
    const regex = new RegExp(value, 'i');
    const f = subsidiaries.filter( s => regex.test(s.state));
    setFiltered(f);
  }

  return (
    <div className="generic-admin-table admin-subsidiaries-list">
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
          ok
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

function mapSateToProps({ subsidiary }) {
  return {
    subsidiaries: subsidiary.array,
    fetching: subsidiary.fetching,
    noSubsidiaries: subsidiary.noData,
  };
}

export default connect(
  mapSateToProps, {
    deletedSubsidiary,
    populateSubsidiaries,
  }
)(AdminSubsidiariesList);
