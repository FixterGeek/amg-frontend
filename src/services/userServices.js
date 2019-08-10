// eslint-disable-next-line no-unused-vars
import axios from 'axios';

const baseAuthURL = process.env.REACT_APP_BASE_AUTH_API;
const APIURL = process.env.REACT_APP_BASE_API_URL;

export const login = async (auth) => axios.post(
  `${baseAuthURL}/login`, auth,
  {
    headers: {
      'Content-Type': 'application/json',
    },
  },
).then(res => res.data);

const logout = async (history) => {
  await localStorage.removeItem('authToken');
  history.push('/login');
};

export const signup = async (name, email, password) => axios.post(`${baseAuthURL}/signup`, {
  name,
  email,
  password,
}).then(res => res.data);

export const getSelfUser = async () => {
  const authToken = await localStorage.getItem('authToken');
  return axios.get(`${baseAuthURL}/self`, {
    headers: {
      Authorization: authToken,
    },
  }).then(({ data }) => data);
};

/* Events section */


/* Activities section */

const getActivitiesForEvent = async (eventId) => {
  const authToken = await localStorage.getItem('authToken');
  return axios.get(`${APIURL}/eventActivities?query={"event": "${eventId}"}`, {
    headers: {
      Authorization: authToken,
    },
  });
};

const getSingleActivity = async (activityId) => {
  const authToken = await localStorage.getItem('authToken');
  return axios.get(`${APIURL}/aventActivities/${activityId}`, {
    headers: {
      Authorization: authToken,
    },
  });
};

const getActivitiesForUser = async (userId) => {
  const authToken = await localStorage.getItem('authToken');
  return axios.get(`${APIURL}/eventActivities?query={"assistants":{"$in":["${userId}"]}}`, {
    headers: {
      Authorization: authToken,
    },
  });
};

const activitySubscribe = async (eventId) => {
  const authToken = await localStorage.getItem('authToken');
  return axios.post(`${APIURL}/eventActivities/${eventId}/assist`, null, {
    headers: {
      Authorization: authToken,
    },
  });
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

const toPublish = async (data, headers) => {
  const authToken = await localStorage.getItem('authToken');
  return axios.post(`${APIURL}/publications`, data, {
    headers: {
      Authorization: authToken,
      ...headers,
    },
  });
};

const addToFav = async (postId) => {
  const authToken = await localStorage.getItem('authToken');
  return axios.post(`${APIURL}/publications/${postId}/like`, null, {
    headers: {
      Authorization: authToken,
    },
  });
};
