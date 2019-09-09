import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Table, Icon, Input, Button, Popconfirm } from 'antd';

import useSweet from '../../../hooks/useSweetAlert';
import { searchResource } from '../../../services/resourcesServices';
import ResourceRecord from './ResourceRecord';

function ResourcesTable({
  onSearch, data, admin,
  dispatchDelete, emptyText, onSearchResults,
  resourceType,
}) {
  const { Search } = Input;

  const { errorAlert } = useSweet();

  const handleSearch = (value) => {
    if (onSearch) onSearch(value)
    searchResource(value, resourceType)
      .then(data => {
        if (onSearchResults) onSearchResults(data);
        return data;
      })
      .catch(error => errorAlert({}));
  }

  const columns = [
    {
      key: 'resource',
      title: (
        <div className="reusables-resources-table-finder">
          <Search
            onSearch={handleSearch}
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
                  onConfirm={() => handleDelete(record._id, record.docsURLS[0], record.url)}
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

  const handleDelete = (resourceId, fileUrl, previewUrl) => {
    if (dispatchDelete) dispatchDelete(resourceId, fileUrl, previewUrl);
  }

  return (
    <div className="reusables-resources-table">
      <Table
        columns={columns}
        dataSource={data}
        rowKey="_id"
        locale={{ emptyText }}
      />
    </div>
  )
}

export default ResourcesTable;

ResourcesTable.propTypes = {
  onSearch: PropTypes.func,
  data: PropTypes.array,
  admin: PropTypes.bool,
  dispatchDelete: PropTypes.func,
  emptyText: PropTypes.string,
  resourceType: PropTypes.string,
};

ResourcesTable.defaultProps = {
  onSearch: null,
  data: [],
  admin: false,
  dispatchDelete: null,
  emptyText: 'No hay datos',
  resourceType: 'Publicaciones',
}
