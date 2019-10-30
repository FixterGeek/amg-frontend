import React from 'react';
import { Link } from 'react-router-dom';

import { Tabs, Icon, Table } from 'antd';

import ActionMenu from './reusables/ActionMenu';

import virtualData from './reusables/virtualRecords.json';

function AdminSubsidiariesList({
  subsidiaries
}) {
  const { TabPane } = Tabs;

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
      render: () => (<ActionMenu />),
    },
  ]

  const data = [];

  return (
    <div className="generic-admin-table">
      <Tabs type="card" className="generic-table-header">
        <TabPane tab={<Icon type="search" />} key="1">
          ok
        </TabPane>
        <TabPane tab={<Icon type="filter" />} key="2">
          ok
        </TabPane>
      </Tabs>
      <Table columns={columns} dataSource={subsidiaries} locale={{ emptyText: 'Sin filiales' }} />
    </div>
  )
}

export default AdminSubsidiariesList;
