import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Typography, Carousel } from 'antd';

import ProfilePhoto from '../atoms/ProfilePhoto';
import PostIcons from '../atoms/PostIcons';
import ImagePreview from '../components/feed/reusables/ImagePreview';
import FileItem from '../components/feed/reusables/FileItem';


function PostItem({ publication }) {
  const {
    text, updatedAt, _id, liked,
    imagesURLS = [], user, docsURLS = [],
  } = publication;
  const { basicData = {} } = user;
  const { photoURL = null, name = '', dadSurname = '' } = basicData;
  const { Title, Text } = Typography;

  const date = moment(updatedAt).local('es');
  const momentDate = moment().calendar(date, {
    sameDay: `[Hoy a las ${date.format('h:mm a')}]`,
    nextDay: `[Ayer a las ${date.format('h:mm a')}]`,
    lastWeek: `[Este ${date.format('dddd')} a las ${date.format('h:mm a')}]`,
    sameElse:
      `[
        ${date.format('dddd')} ${date.format('DD')} de ${date.format('MMMM')} a las ${date.format('h:mm a')}
      ]`,
  });

  return (
    <div className="post-item">
      <div className="post-item-info">
        <div className="post-item-photo">
          <ProfilePhoto photoURL={photoURL} />
        </div>
        <div>
          <div>
            <Title level={2}>{ `${name} ${dadSurname}` }</Title>
          </div>
          <Text>{ momentDate }</Text>
        </div>
      </div>
      <div className="post-item-post">
        <Text>
          { text }
        </Text>
        {
          imagesURLS[0] ? (
            <Carousel>
              {
                imagesURLS.map(url => (
                  <div>
                    <ImagePreview url={url} className="image-item" />
                  </div>
                ))
              }
            </Carousel>
          ) : null
        }
        <div className="files-items">
          {
            docsURLS.map(url => (
              <FileItem url={url} />
            ))
          }
        </div>
      </div>
      <PostIcons pubId={_id} favs={liked} />
    </div>
  );
}

export default PostItem;

PostItem.propTypes = {
  publication: PropTypes.shape({
    user: PropTypes.shape({
      photoURL: PropTypes.string,
    }),
    urls: PropTypes.arrayOf(PropTypes.string),
    imagesURLS: PropTypes.arrayOf(PropTypes.string),
    docsURLS: PropTypes.arrayOf(PropTypes.string),
    text: PropTypes.string,
    liked: PropTypes.arrayOf(PropTypes.string),
  })
};

PostItem.defaultProps = {
  publication: {
    user: {
      photoURL: '',
    },
  },
};
