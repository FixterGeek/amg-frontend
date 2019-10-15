import axios from 'axios';

const APIURL = `${process.env.REACT_APP_BASE_API_URL}/users`;
const AUTHURL = `${process.env.REACT_APP_BASE_API_URL}/auth`;


export const postSubsidiary = (subsidiaryData) => {
  const token = localStorage.authToken;
  return axios.post(AUTHURL, subsidiaryData, {
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
  return axios.get(`${APIURL}?query={"userType": "Filial"}`, {
    headers: {
      Authorization: token,
    },
  }).then(({ data }) => data);
};


export const getSingleUser = () => {
  const token = localStorage.authToken;
  return axios.get(`${APIURL}/${id}`, {
    headers: {
      Authorization: token,
    },
  }).then(({ data }) => data);
}