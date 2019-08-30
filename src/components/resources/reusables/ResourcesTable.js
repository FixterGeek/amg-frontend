import React from 'react';
import { Link } from 'react-router-dom';

import { Table, Icon, Input, Button, Popconfirm } from 'antd';

import ResourceRecord from './ResourceRecord';

function ResourcesTable({ onSearch, data, admin, dispatchDelete }) {
  const { Search } = Input;

  const columns = [
    {
      key: 'resource',
      title: (
        <div className="reusables-resources-table-finder">
          <Search
            onSearch={onSearch ? value => onSearch(value) : null }
            placeholder="¿Buscas algo?"
          />
        </div>
      ),
      render: (text, record) => (
        <div key={record._id}>
          <ResourceRecord
            preview={record.url}
            title={record.title}
            subtitle={record.authors}
            footer={record.volume}
            url={record.docsURLS[0]}
          />
          {
            admin && (
              <div>
                <Popconfirm
                  onConfirm={() => handleDelete(record._id)}
                  title="¿Deseas borrar este recurso?"
                  cancelText="NO"
                  okText="SI">
                  <Button type="link" style={{ paddingLeft: 0, color: '#e24c4c' }}>
                    Borrar recurso
                    <Icon type="delete" />
                  </Button>
                </Popconfirm>
                <Link to={{
                  pathname: `/admin/resources/edit/${record._id}`,
                  state: { ...record }
                }}>
                  Editar recurso 
                  <Icon type="edit" />
                </Link>
              </div>
            )
          }
        </div>
      ),
    },
  ]

  const handleDelete = (resourceId) => {
    if (dispatchDelete) dispatchDelete(resourceId)
  }

  return (
    <div className="reusables-resources-table">
      <Table columns={columns} dataSource={data} rowKey="_id" />
    </div>
  )
}

export default ResourcesTable;
