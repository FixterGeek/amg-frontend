import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { Typography } from 'antd';

import ImagePreview from '../../reusables/ImagePreview';
import PostIcons from '../../../atoms/PostIcons';
import AttacFileItem from '../../reusables/AttachFileItem';
import PublicationGallery from './PublicationGallery';


function PostItem({ publication }) {
  const {
    text, updatedAt, _id, liked, imagesURLS = [], user = {}, docsURLS = [],
  } = publication;
  const { basicData = {} } = user || {};
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
          <Link to={`/dashboard/perfil/publico/${user.email}`}>
            <ImagePreview
              url={basicData.photoURL || 'https://firebasestorage.googleapis.com/v0/b/amgweb.appspot.com/o/reusables%2FAsset%20190.png?alt=media&token=1b14df1f-251f-4c41-a33e-db500a75fb79'}
              containerStyle={{
                maxWidth: '80px', maxHeight: '80px', borderStyle: 'none',
                backgroundColor: '#1f2536'
              }}
              imageStyle={{ maxWidth: '120px', maxHeight: '120px' }}
              alt={`${basicData.name} ${basicData.dadSurname}`}
            />
          </Link>
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
        <div>
          { imagesURLS[0] && <PublicationGallery urlArray={imagesURLS} /> }
        </div>
        <div className="files-items">
          {
            docsURLS.map(url => (
              <AttacFileItem url={url} link />
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
