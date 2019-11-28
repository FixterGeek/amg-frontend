import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Typography, Avatar } from 'antd';

import { getUser } from '../../services/userServices';
import ContainerItem from '../reusables/ContainerItem';

function UserList({
  user, match, history
}) {
  const { Title } = Typography;
  const { params } = match;
  const { location } = history;

  const type = location.pathname.split('/').pop();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUser(params.userId)
      .then(data => {
        if (type === 'seguidores') setUsers(data.followers);
        else setUsers(data.following);
      })
  }, [users.length])

  return (
    <div className="dashboard-container profile-user-list">
      <ContainerItem className="dash-item-center">
        <Title>{type === 'seguidores' ? 'Colegas que te siguen' : 'Colegas que sigues'}</Title>

        <ContainerItem className="profile-user-list-list">
          {
            users.map(u => (
              <div className="item">
                <div className="content">
                  <Avatar
                    shape="square"
                    size={180}
                    src={
                      u.basicData.photoURL && u.basicData.photoURL != 'null'
                        ? u.basicData.photoURL
                        : 'https://firebasestorage.googleapis.com/v0/b/amgweb.appspot.com/o/reusables%2Fprofile_9.png?alt=media&token=be192ce4-34cd-440d-a898-632d13acb44a'}
                  />
                  <Link className="data" to={`/dashboard/perfil/publico/${u.slug || u.email}`}>
                    <span>{ `${u.basicData.name} ${u.basicData.dadSurname}` }</span>
                    <span>{u.basicData.address.state || u.basicData.speciality}</span>
                  </Link>
                </div>
              </div>
            ))
          }
        </ContainerItem>
      </ContainerItem>
    </div>
  )
}

function mapStateToProps({ user }) {
  return {
    user,
  }
}

export default connect(
  mapStateToProps
)(UserList);
