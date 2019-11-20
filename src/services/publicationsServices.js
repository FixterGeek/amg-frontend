import axios from 'axios';

const APIURL = `${process.env.REACT_APP_BASE_API_URL}/publications`;

export const getPublications = (query = {}) => {
  const token = localStorage.authToken;
  return axios.get(`${APIURL}?query=${query}`, {
    headers: {
      Authorization: token,
    },
  }).then(({ data }) => data);
};

export const getSelfPublications = async () => {
  const user = await JSON.parse(localStorage.getItem('user'));
  const token = localStorage.authToken;

  return axios.get(`${APIURL}?query={"user": "${user._id}"}`, {
    headers: {
      Authorization: token,
    }
  })
    .then(({ data }) => data);
};


export const getPublicationsForUser = (userId) => {
  const token = localStorage.authToken;
  return axios.get(`${APIURL}?query={"user": "${userId}"}`, {
    headers: {
      Authorization: token,
    },
  }).then(({ data }) => data);
};


export const toPublish = async (publicationData) => {
  const authToken = await localStorage.getItem('authToken');
  return axios.post(`${APIURL}`, publicationData, {
    headers: {
      Authorization: authToken,
      'Content-Type': 'multipart/form-data',
    },
  }).then(({ data }) => data);
};


export const deletePost = (postId) => {
  const token = localStorage.authToken;
  return axios.delete(`${APIURL}/${postId}`, {
    headers: {
      Authorization: token,
    },
  }).then(({ data }) => data);
}
