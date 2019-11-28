import React from 'react';
import { connect } from 'react-redux';

import { Typography, Avatar } from 'antd';

import ContainerItem from '../reusables/ContainerItem';

function UserList({
  user, match, history
}) {
  const { Title } = Typography;
  const { params } = match;
  const { location } = history;

  const type = location.pathname.split('/').pop();
  const iterableUsers = ['1', '2', '3', '4', '5'] // || type === 'seguidores' ? user.followers : user.following;

  return (
    <div className="dashboard-container profile-user-list">
      <ContainerItem className="dash-item-center">
        <Title>{type === 'seguidores' ? 'Colegas que te siguen' : 'Colegas que sigues'}</Title>

        <ContainerItem className="profile-user-list-list">
          {
            iterableUsers.map(u => (
              <div className="item">
                <div className="content">
                  <Avatar shape="square" size={168} />
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
