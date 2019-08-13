import axios from 'axios';

const APIURL = `${process.env.REACT_APP_BASE_API_URL}/institutions`;
const authToken = localStorage.getItem('authToken');
const axiosInstance = axios.create({
  headers: {
    Authorization: authToken,
  },
});

export const getInstitutions = type => axiosInstance.get(`${APIURL}?query={"type":${type}}`)
  .then(({ data }) => data);


export const createInstitution = institutionData => axiosInstance.post(`${APIURL}`, institutionData)
  .then(({ data }) => data);
