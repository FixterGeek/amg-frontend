import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faShareAlt } from '@fortawesome/free-solid-svg-icons';

import { palette } from '../styles/theme';
import useAmgService from '../hooks/services/useAmgService';

function PostIcons({ pubId, favs, user }) {
  const [state, setState] = useState({
    liked: [...favs],
  });
  const { addToFav } = useAmgService();

  const updateLiked = () => {
    const { liked } = state;

    if (liked.includes(user._id)) {
      const likedUpdate = liked.filter(like => like !== user._id);
      setState({ liked: [...likedUpdate] });
    } else {
      setState({ liked: [...state.liked, user._id] });
    }
  };

  const addToFavorities = () => {
    updateLiked();
    addToFav(pubId).then(({ data }) => {
      //
    }).catch(({ response }) => {
      updateLiked();
    });
  };

  return (
    <div className="post-icons">
      <div className="post-icons-item">
        <FontAwesomeIcon
          icon={faHeart}
          onClick={() => addToFavorities()}
          style={state.liked.includes(user._id) ? { color: palette.red } : {}} />
        { state.liked.length }
      </div>
      <div className="post-icons-item">
        <FontAwesomeIcon icon={faShareAlt} />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps)(PostIcons);

PostIcons.propTypes = {
  faversNumber: PropTypes.number,
};

PostIcons.defaultProps = {
  faversNumber: 0,
};
