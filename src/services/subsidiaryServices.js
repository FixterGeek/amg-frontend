import axios from 'axios';

const APIURL = `${process.env.REACT_APP_BASE_API_URL}/filiales`;
const AUTHURL = `${process.env.REACT_APP_BASE_API_URL}/auth`;


export const postSubsidiary = (subsidiaryData) => {
  const token = localStorage.authToken;
  return axios.post(APIURL, subsidiaryData, {
    headers: {
      Authorization: token,
    },
  }).then(({ data }) => data);
};


export const patchSubsidiary = (subsidiaryId, subsidiaryData) => {
  const token = localStorage.authToken;
  return axios.patch(`${APIURL}/${subsidiaryId}`, subsidiaryData, {
    headers: {
      Authorization: token,
    },
  }).then(({ data }) => data);
};


export const getSubsidiaries = () => {
  const token = localStorage.authToken;
  return axios.get(`${APIURL}`, {
    headers: {
      Authorization: token,
    },
  }).then(({ data }) => data);
};


export const getSingleSubsidiary = (subsidiaryId) => {
  const token = localStorage.authToken;
  return axios.get(`${APIURL}/${subsidiaryId}`, {
    headers: {
      Authorization: token,
    },
  }).then(({ data }) => data);
}