import axios from 'axios';

const APIURL = `${process.env.REACT_APP_BASE_API_URL}/studies`;
const authToken = localStorage.getItem('authToken');
const axiosInstance = axios.create({
  headers: {
    Authorization: authToken,
  },
});


export const getStudies = () => axiosInstance.get(`${APIURL}`).then(({ data }) => data);

export const createStudie = () => axiosInstance.post(`${APIURL}`).then(({ data }) => data);
