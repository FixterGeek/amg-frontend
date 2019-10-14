import axios from 'axios';

const APIURL = `${process.env.REACT_APP_BASE_API_URL}/eventModules`;


export const postModule = (modulePayload) => {
  const token = localStorage.authToken;
  return axios.post(APIURL, modulePayload, {
    headers: {
      Authorization: token,
    },
  }).then(({ data }) => data);
};


export const getModules = () => {
  const token = localStorage.authToken;
  return axios.get(APIURL, {
    headers: {
      Authorization: token,
    },
  }).then(({ data }) => data);
};


export const patchModule = (moduleId, moduleData) => {
  const token = localStorage.authToken;
  if (moduleData) delete moduleData._id;
  return axios.patch(`${APIURL}/${moduleId}`, moduleData, {
    headers: {
      Authorization: token,
    },
  }).then(({ data }) => data);
};


export const deleteModule = (moduleId) => {
  const token = localStorage.authToken;
  return axios.delete(`${APIURL}/${moduleId}`, {
    headers: {
      Authorization: token,
    },
  }).then(({ data }) => data);
};
