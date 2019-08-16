import axios from 'axios';

const APIURL = `${process.env.REACT_APP_BASE_API_URL}/institutions`;
let user
if (localStorage.user) user = JSON.parse(localStorage.user)
const token = localStorage.authToken;

console.log(token);

export const getInstitutions = type => axios.get(`${APIURL}?query={"type":${type}}`)
  .then(({ data }) => data);


export const getAllInstitutions = () => {
  const { authToken } = localStorage;
  axios.get(`${APIURL}`, {
    headers: {
      Authorization: authToken,
    },
  }).then(({ data }) => data);
};

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
