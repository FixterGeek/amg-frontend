import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Input } from 'antd';

import ProfilePhoto from './ProfilePhoto';

function PublicationBox({ user, postText, setText }) {
  const { basicData = {} } = user;
  const { photoURL } = basicData;
  const { TextArea } = Input;


  const handleChage = (event) => {
    const { target: { value } } = event;
    setText(value);
  };

  return (
    <div className="publication-box">
      <ProfilePhoto
        className="profile-photo-m on-box"
        photoURL={photoURL} />
      <TextArea
        value={postText}
        onChange={handleChage}
        placeholder="Cuéntanos algo"
        autosize={{ minRows: 4, maxRows: 4 }} />
    </div>
  );
}

function mapStateToProps(state) {
  return { user: state.user, publications: state.publications };
}

export default connect(mapStateToProps)(PublicationBox);

PublicationBox.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  user: PropTypes.object,
  postText: PropTypes.string,
  setText: PropTypes.func,
};

PublicationBox.defaultProps = {
  user: {
    basicData: {
      photoURL: 'https://res.cloudinary.com/dlopomjr5/image/upload/v1563563368/amg-examples/generic_user.jpg',
    },
  },
  postText: '',
  setText: null,
};
