import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import { Select, Icon } from 'antd';

import { findUsers } from '../../services/userServices';
import Spinner from '../reusables/Spinner';
import ImagePreview from '../reusables/ImagePreview';
import logo from '../../assets/log.png'

function FeedAmgFinder({ history }) {
  const [results, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = (value) => {
    setLoading(true);
    findUsers(value).then((usersArray) => {
      setResult(usersArray);
      setLoading(false);
    });
  }

  const handleChange = (value) => {
    history.push(`/dashboard/perfil/publico/${value}`, { state: { isEmail: value.includes('@') }})
  }

  return (
    <div className="feed-amg-finder">
      { loading && <Spinner fullScrren /> }
      <img src={logo} height="50" />
      <Select
        suffixIcon={<Icon type="search" />}
        showSearch
        filterOption={false}
        defaultActiveFirstOption={false}
        onSearch={handleSearch}
        onChange={handleChange}
      >
        {
          results.map(r => (
            <Select.Option key={r._id} value={r.slug || r.email} className="feed-amg-finder-result">
              <ImagePreview url={r.basicData.photoURL || 'https://firebasestorage.googleapis.com/v0/b/amgweb.appspot.com/o/reusables%2FAsset%20190.png?alt=media&token=1b14df1f-251f-4c41-a33e-db500a75fb79'} />
              {`${r.basicData.name} ${r.basicData.dadSurname} ${r.basicData.momSurname || ''}`}
            </Select.Option>
          ))
        }
      </Select>
    </div>
  );
}

export default withRouter(FeedAmgFinder);
