import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import { Select, Icon } from 'antd';

import { findUsers } from '../../services/userServices';
import Spinner from '../reusables/Spinner';
import ImagePreview from '../reusables/ImagePreview';
import logo from '../../assets/log.png'

function FeedAmgFinder({ history }) {
  const [results, setResult] = useState([]);
  const [noData, setNoData] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = (value) => {
    setLoading(true);
    findUsers(value).then((usersArray) => {
      setResult(usersArray);
      setNoData(!usersArray.length > 0);
      setLoading(false);
    });
  }

  const handleChange = (value) => {
    if(value !== 'no-user') history.push(`/dashboard/perfil/publico/${value}`, { state: { isEmail: value.includes('@') }})
  }

  return (
    <div className="feed-amg-finder">
      {/* { loading && <Spinner fullScrren /> } */}
      <img src={logo} height="50" />
      <Select
        suffixIcon={<Icon type="search" />}
        showSearch
        filterOption={false}
        defaultActiveFirstOption={false}
        onSearch={handleSearch}
        onChange={handleChange}
        placeholder="Buscar colegas"
        notFoundContent={noData ? 'Usuario no encontrado' : 'Encuentra colegas'}
      >
        {
          results.map(r => (
            <Select.Option key={r._id} value={r.slug || r.email} className="feed-amg-finder-result">
              <ImagePreview
                imageStyle={!r.basicData.photoURL ? { maxHeight: '20px', maxWidth: '20px' } : null}
                containerStyle={{ backgroundColor: '#f5f8f9' }}
                url={r.basicData.photoURL || 'https://firebasestorage.googleapis.com/v0/b/amgweb.appspot.com/o/reusables%2Fprofile_9.png?alt=media&token=be192ce4-34cd-440d-a898-632d13acb44a'} />
              {`${r.basicData.name} ${r.basicData.dadSurname} ${r.basicData.momSurname || ''}`}
            </Select.Option>
          ))
        }
        {
          noData &&
          <Select.Option key="no-user" value="no-user">
            Usuario no encontrado
          </Select.Option>
        }
      </Select>
    </div>
  );
}

export default withRouter(FeedAmgFinder);
