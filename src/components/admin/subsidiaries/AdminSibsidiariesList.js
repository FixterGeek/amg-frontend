import React from 'react';
import { Link } from 'react-router-dom';

import { Tabs, Icon, Table } from 'antd';

import ActionMenu from './reusables/ActionMenu';

import virtualData from './reusables/virtualRecords.json';

function AdminSubsidiariesList() {
  const { TabPane } = Tabs;

  const columns = [
    {
      title: 'Razón social',
      dataIndex: 'name',
      render: (text, record) => (
        <Link to={{ pathname: `/admin/filiales/${record._id}`, state: record }}>
          { record.basicData.name }
        </Link>
      )
    },
    {
      title: 'Zona',
      dataIndex: 'basicData.address.addressName',
    },
    {
      title: 'Tesorero',
      dataIndex: 'treasurer',
    },
    {
      title: 'President',
      dataIndex: 'president',
    },
    {
      title: 'Miembros asignados',
      dataIndex: 'members',
      render: (text, record) => (<span>{ record.members.length }</span>),
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
      <Table columns={columns} dataSource={virtualData} />
    </div>
  )
}

export default AdminSubsidiariesList;
