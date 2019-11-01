import React, { createRef, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { List, Avatar, Badge, Card, Input } from 'antd';

import amgLogo from '../../assets/log.png';

function Chat({ user = {}, chat = { messages: [] }, onNewMessage, toUser }) {
  const { Item } = List;
  const { Meta } = Card;
  const { TextArea } = Input;
  const [message, setMessage] = useState(null);

  return (
    <div className="reusables-chat">
      <List className="reusables-chat-header">
        <Item>
          <Item.Meta
            avatar={
              <Avatar
                shape="square"
                src={user.filialAsAdmin ? amgLogo : toUser.photoURL}
                size="large"
                icon="user"
              />
            }
            title={user.filialAsAdmin ? 'AMG' : `${toUser.name}`}
          />
        </Item>
      </List>
      <div className="reusables-chat-messages">
        {
          chat.messages.map((m, index) => (
            <Card key={m._id || index}>
              <Meta
                avatar={<Avatar shape="square" size="small" src={m.user.photoURL} />}
                title={m.user.name}
                description={moment(m.date).toNow()}
              />
              <div>
                { m.message }
              </div>
            </Card>
          ))
        }
      </div>
      <TextArea
        onChange={({ target }) => setMessage(target.value)}
        value={message}
        autosize={{
          minRows: 1,
          maxRows: 5,
        }}
        placeholder="Escribe un mensaje..."
        onPressEnter={e => {
          e.preventDefault();
          onNewMessage({
            user: {
              name: `${user.basicData.name} ${user.basicData.dadSurname}`,
              photoURL: user.basicData.photoURL,
              _id: user._id,
              email: user.email,
              userType: user.userType,
              phone: user.basicData.phone,
              filial: user.filialAsAdmin ? `Filial de ${user.filialAsAdmin.state}` : false,
            },
            message: e.target.value,
            date: moment().toString(),
          })
          setMessage(null);
        }}
      />
    </div>
  );
}

function mapStateToProps({ user }) {
  return { user };
}

export default connect(
  mapStateToProps
)(Chat);
