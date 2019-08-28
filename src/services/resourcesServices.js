import axios from 'axios';

const baseAPI = process.env.REACT_APP_BASE_API_URL;
const APIURL = `${baseAPI}/recursos`;

export const getResources = (type) => {
  const token = localStorage.authToken;
  return axios.get(`${APIURL}?filter={"type": "${type}"}`, {
    headers: {
      Athorization: token,
    },
  })
    .then(({ data }) => data);
};

export const createResource = (resourceData) => {
  const token = localStorage.authToken;
  return axios.post(`${APIURL}`, resourceData, {
    headers: {
      Authorization: token,
    },
  }).then(({ data }) => data);
};
