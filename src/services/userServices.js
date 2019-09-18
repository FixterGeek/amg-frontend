// eslint-disable-next-line no-unused-vars
import axios from 'axios';

const baseAuthURL = process.env.REACT_APP_BASE_AUTH_API;
const APIURL = process.env.REACT_APP_BASE_API_URL;

export const login = async auth => axios.post(
  `${baseAuthURL}/login`, auth,
  {
    headers: {
      'Content-Type': 'application/json',
    },
  },
).then(res => res.data);

export const logout = async (history) => {
  await localStorage.removeItem('authToken');
  history.push('/login');
};

export const signup = async (userData) => {
  return axios.post(`${baseAuthURL}/signup`, userData)
    .then(res => res.data);
};


export const getSelfUser = async () => {
  const authToken = await localStorage.getItem('authToken');
  return axios.get(`${baseAuthURL}/self`, {
    headers: {
      Authorization: authToken,
    },
  }).then(({ data }) => data);
};


export const getUserBySlug = async (slug) => {
  const token = localStorage.authToken;
  return axios.get(`${APIURL}/users?query={"email": "${slug}"}`, {
    headers: {
      Authorization: token,
    },
  }).then(({ data }) => data);
};


export const updateUser = (userData) => {
  const user = JSON.parse(localStorage.user);
  const token = localStorage.authToken;

  return axios.patch(`${APIURL}/users/${user._id}`, userData, {
    headers: {
      Authorization: token,
    },
  }).then(({ data }) => data);
};


export const followUser = (userId) => {
  const token = localStorage.authToken;
  return axios.post(`${APIURL}/users/${userId}/follow`, null, {
    headers: {
      Authorization: token,
    },
  }).then(({ data }) => data);
};


export const resetPassword = ({ email }) => axios.post(`${baseAuthURL}/forgot`, { email })
  .then(({ data }) => data);


export const getUserByFilter = (filter) => {
  const token = localStorage.authToken;
  return axios.get(`${APIURL}/users?query=${filter}`, {
    headers: {
      Authorization: token,
    },
  }).then(({ data }) => data);
};

/* Publications section */

export const getPublications = async () => {
  const authToken = await localStorage.getItem('authToken');
  return axios.get(`${APIURL}/publications/`, {
    headers: {
      Authorization: authToken,
    },
  }).then(({ data }) => data);
};
