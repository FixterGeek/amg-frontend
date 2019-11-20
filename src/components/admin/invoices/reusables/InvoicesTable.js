import React from 'react';
import moment from 'moment';

import { Table, Tabs, Icon, Input } from 'antd';

import InvoicesAction from './InvoicesAction';

function InvoicesTable() {
  const { TabPane } = Tabs;
  const { Search } = Input;

  const data = [
    { ref: '02384958829940837', date: moment().format('DD/MM/YYYY'), concept: 'Curso', amount: '100', method: 'oxxo' },
    { ref: '02384958829940838', date: moment().format('DD/MM/YYYY'), concept: 'Curso', amount: '100', method: 'oxxo' },
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
      render: (t, r) => (
        <span>{Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(r.amount)} MXN</span>
      )
    },
    {
      title: 'Metodo de pago',
      dataIndex: 'method',
    },
    {
      title: 'Acciones',
      render: () => <InvoicesAction />,
    }
  ];


  return (
    <div className="admin-reusables-invoices-table">
      <Tabs type="card">
        <TabPane tab={<Icon type="search" />} key="1">
          <div className="finder">
            <Search
              placeholder="Escribe el número de referencia"
            />
          </div>
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
