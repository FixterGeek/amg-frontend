import axios from 'axios';

const baseAPI = process.env.REACT_APP_BASE_API_URL;
const APIURL = `${baseAPI}/recursos`;

export const getResources = () => {
  const token = localStorage.authToken;
  return axios.get(`${APIURL}`, {
    headers: {
      Authorization: token || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZDY5OWU2ZjJhNzU1MjAwMTcxMjJiOTEiLCJlbWFpbCI6ImZlZWRAZml4dGVyLm9yZyIsImlhdCI6MTU3MDIxODI4MywiZXhwIjoxNTcwNDc3NDgzfQ.GBjBpvK__3p9nGbwiZ53YwP0thcyKFglALIX0rAF9Lc',
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

export const deleteResource = (resourceId) => {
  const token = localStorage.authToken;
  return axios.delete(`${APIURL}/${resourceId}`, {
    headers: {
      Authorization: token,
    },
  }).then(({ data }) => data);
};

export const updateResource = (resourceId, resourceData) => {
  const token = localStorage.authToken;
  return axios.patch(`${APIURL}/${resourceId}`, resourceData, {
    headers: {
      Authorization: token,
    },
  }).then(({ data }) => data);
};


export const searchResource = (text, type = 'Publicaciones') => {
  const token = localStorage.authToken;
  return axios.get(`${APIURL}?search=${text}&query={"tipo": "${type}"}`, {
    headers: {
      Authorization: token,
    },
  }).then(({ data }) => data);
};
