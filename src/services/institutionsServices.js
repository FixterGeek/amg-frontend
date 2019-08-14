import axios from 'axios';

const APIURL = `${process.env.REACT_APP_BASE_API_URL}/institutions`;
const user = JSON.parse(localStorage.user);
const token = localStorage.authToken;

export const getInstitutions = type => axios.get(`${APIURL}?query={"type":${type}}`)
  .then(({ data }) => data);


export const getAllInstitutions = () => axios.get(`${APIURL}`, {
  headers: {
    Authorization: token,
  },
}).then(({ data }) => data);

export const createInstitution = institutionData => axios.post(`${APIURL}`, institutionData, {
  headers: {
    Authorization: token,
  },
})
  .then(({ data }) => data);

export const createIntitutionForUser = institutionData => axios.post(`${APIURL}`, {
  ...institutionData,
  user: user._id,
})
  .then(({ data }) => data);
