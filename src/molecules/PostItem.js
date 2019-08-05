import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Typography } from 'antd';

import ProfilePhoto from '../atoms/ProfilePhoto';
import PostIcons from '../atoms/PostIcons';


function PostItem({ publication }) {
  const {
    text, updatedAt, _id, liked,
    docsURLS, imagesURLS,
  } = publication;
  const { Title, Text } = Typography;

  const date = moment(updatedAt).local('es');
  const momentDate = moment().calendar(date, {
    sameDay: `[Hoy a las ${date.format('h:mm a')}]`,
    nextDay: `[Ayer a las ${date.format('h:mm a')}]`,
    lastWeek: `[Este ${date.format('dddd')} a las ${date.format('h:mm a')}]`,
    sameElse: `[${date.format('dddd')} de ${date.format('mmmm')} a las ${date.format('h:mm a')}]`,
  });

  return (
    <div className="post-item">
      <div className="post-item-info">
        <div className="post-item-photo">
          <ProfilePhoto />
        </div>
        <div>
          <div>
            <Title level={2}>Benito</Title>
          </div>
          <Text>{ momentDate }</Text>
        </div>
      </div>
      <div className="post-item-post">
        <Text>
          { text }
        </Text>
        {
          imagesURLS.length > 0 && (
            <div
              className="post-item-image"
              style={{ backgroundImage: `url(${imagesURLS[0]})` }} />
          )
        }
      </div>
      <PostIcons pubId={_id} favs={liked} />
    </div>
  );
}

export default PostItem;
