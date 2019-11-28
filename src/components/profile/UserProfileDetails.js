import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import useSweet from '../../hooks/useSweetAlert';
import { getUserBySlug } from '../../services/userServices';
import { getPublicationsForUser } from '../../services/publicationsServices';
import { followUserAction } from '../../store/ducks/userDuck';
import BasicInformationUser from './reusables/BasicInformationUser';
import ContainerItem from '../reusables/ContainerItem';
import PostItem from '../feed/reusables/PostItem';
import Spinner from '../reusables/Spinner';

function UserProfileDetails({
  history, match = {}, user,
  followUserAction, userFetching, userStatus,
  followingUsers,
}) {
  const { errorAlert, infoAlert } = useSweet();

  const [loading, setLoading] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [userData, setUserData] = useState({
    _id: null,
  });
  const [posts, setPosts] = useState([]);
  const [followingsId, setFollowingsId] = useState([]);


  useEffect(() => {
    const { params } = match;
    const { slug } = params;
    if (slug) {
      getUserBySlug(slug, `${slug}`.includes('@'))
        .then((data) => {
          if (!data[0]) {
            infoAlert({ text: 'El usuario que intentas buscar no existe' });
            history.push('/dashboard');
            return;
          }
          setUserData(data[0]);
          setLoading(false);
          setLoadingPosts(true);
          return getPublicationsForUser(data[0]._id);
        })
        .then((data) => {
          setPosts(data);
          setLoadingPosts(false);
        })
        .catch(() => {
          setLoading(false);
          setLoadingPosts(false);
          errorAlert({});
        });
    }
  }, []);

  useEffect(() => {
    const idArray = followingUsers.map(item => item._id || item);
    setFollowingsId(idArray);
  }, [followingUsers]);

  return (
    <div className="dashboard-container  relative">
      { loading || userFetching ? <Spinner fullScrren /> : null }
      { userData._id && (
        <BasicInformationUser
          user={userData}
          nonOwn={user._id !== userData._id}
          followDispatch={followUserAction}
          showBio
          follow={followingsId.includes(userData._id)}
        />
      )}
      <ContainerItem style={{ position: 'relative' }}>
        { loadingPosts && <Spinner /> }
        {
          posts.map(post => (
            <PostItem publication={post} />
          ))
        }
      </ContainerItem>
    </div>
  );
}

function mapSateToProps({ user }) {
  return {
    user,
    userFetching: user.fetching,
    userStatus: user.status,
    followingUsers: user.following,
  };
}

export default connect(
  mapSateToProps, {
    followUserAction,
  },
)(UserProfileDetails);
