import axios from 'axios';

const BASE_API = `${process.env.REACT_APP_BASE_API_URL}`;
const APIURL = `${BASE_API}/payments`;


export const paymentEvent = (paymentData) => {
  const token = localStorage.authToken;
  return axios.post(`${APIURL}/event`, paymentData, {
    headers: {
      Authorization: token,
    },
  }).then(({ data }) => data);
};


export const paymentSubscription = (paymentData) => {
  const token = localStorage.authToken;
  return axios.post(`${APIURL}/subscription`, paymentData, {
    headers: {
      Authorization: token,
    },
  }).then(({ data }) => data);
};
