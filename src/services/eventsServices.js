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


export const getSingleActivity = async (activityId) => {
  const token = localStorage.authToken;

  return axios.get(`${baseAPI}/eventActivities/${activityId}`, {
    headers: {
      Authorization: token,
    },
  }).then(({ data }) => data);
};


export const assistAnEvent = async (eventId) => {
  const token = await localStorage.getItem('authToken');

  return axios.post(`${APIURL}/${eventId}/assist`, null, {
    headers: {
      Authorization: token,
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


export const addSpeakerToEvent = (eventId, speakerData) => {
  const token = localStorage.authToken;
  return axios.post(`${APIURL}/${eventId}/speaker`, speakerData, {
    headers: {
      Authorization: token,
    },
  }).then(({ data }) => data);
}


export const patchEventActivity = (activityId, activityData) => {
  const token = localStorage.authToken;
  return axios.patch(`${baseAPI}/eventActivities/${activityId}`, activityData, {
    headers: {
      Authorization: token,
    },
  }).then(({ data }) => data);
}


export const patchEventModule = (moduleId, moduleData) => {
  const token = localStorage.authToken;
  return axios.patch(`${baseAPI}/eventModules/${moduleId}`, moduleData, {
    headers: {
      Authorization: token,
    },
  }).then(({ data }) => data);
}
