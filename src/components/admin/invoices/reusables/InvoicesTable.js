import React from 'react';

import { Table, Tabs, Icon } from 'antd';

function InvoicesTable() {
  const { TabPane } = Tabs;

  const data = [
    { ref: 'ok', date: 'ok', concept: 'ok', amount: '100', method: 'oxxo' },
    { ref: 'ok', date: 'ok', concept: 'ok', amount: '100', method: 'oxxo' },
  ]

  const columns = [
    {
      title: 'No. de referencia',
      dataIndex: 'ref',
    },
    {
      title: 'Fecha',
      dataIndex: 'date',
    },
    {
      title: 'Concepto',
      dataIndex: 'concept',
    },
    {
      title: 'Monto',
      dataIndex: 'amount',
    },
    {
      title: 'Metodo de pago',
      dataIndex: 'method',
    },
    {
      title: 'Acciones'
    }
  ];

  return (
    <div className="admin-reusables-invoices-table">
      <Tabs type="card">
        <TabPane tab={<Icon type="search" />} key="1">
          ok
        </TabPane>
        <TabPane tab={<Icon type="filter" />} key="2">
          ok
        </TabPane>
      </Tabs>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default InvoicesTable;
