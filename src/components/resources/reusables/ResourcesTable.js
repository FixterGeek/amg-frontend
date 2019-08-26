import React from 'react';

import { Table, Icon, Input } from 'antd';

import ResourceRecord from './ResourceRecord';
import hards from './hard-resources.json';

function ResourcesTable({ onSearch }) {
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
        <ResourceRecord
          preview={record.preview}
          title={record.title}
          subtitle={record.subtitle}
          footer={record.footer}
          url={record.url}
        />
      ),
    },
  ]

  return (
    <div className="reusables-resources-table">
      <Table columns={columns} dataSource={hards} />
    </div>
  )
}

export default ResourcesTable;
