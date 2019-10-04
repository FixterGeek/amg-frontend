import React from 'react';

import { Tabs, Icon, Table } from 'antd';

function AdminSubsidiariesList() {
  const { TabPane } = Tabs;

  const columns = [
    {
      title: 'Razón social',
      dataIndes: 'name',
    },
    {
      title: 'Zona',
      dataIndes: 'region',
    },
    {
      title: 'Tesorero',
      dataIndes: 'treasurer',
    },
    {
      title: 'President',
      dataIndes: 'president',
    },
    {
      title: 'Miembros asignados',
      dataIndes: 'members',
    },
    {
      title: 'Acciones',
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
      <Table columns={columns} dataSource={data} />
    </div>
  )
}

export default AdminSubsidiariesList;
