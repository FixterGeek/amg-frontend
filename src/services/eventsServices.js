import axios from 'axios';

const baseAPI = process.env.REACT_APP_BASE_API_URL;
const APIURL = `${baseAPI}/events`;

export const getEvents = async () =>{
  const token = localStorage.authToken;

  return axios.get(`${APIURL}`, {
    headers: {
      Authorization: token,
    },
  }).then(({ data }) => data);
};


export const getSingleEvent = (id) => {
  const token = localStorage.authToken;

  return axios.get(`${APIURL}/${id}`, {
    headers: {
      Authorization: token,
    },
  }).then(({ data }) => data);
};


export const assistAnEvent = (eventId) => {
  const user = JSON.parse(localStorage.getItem('user'));

  return axios.post(`${APIURL}/${eventId}/assist`, null, {
    headers: {
      Authorization: user.token,
    },
  }).then(({ data }) => data);
};

export const activitySubscribe = async (activityId) => {
  const authToken = await localStorage.getItem('authToken');
  return axios.post(`${baseAPI}/eventActivities/${activityId}/assist`, null, {
    headers: {
      Authorization: authToken,
    },
  }).then(({ data }) => data);
};
