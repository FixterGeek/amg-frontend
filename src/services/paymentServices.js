import axios from 'axios';

const BASE_API = `${process.env.REACT_APP_BASE_API_URL}`;
const APIURL = `${BASE_API}/payments`;


export const payment = (paymentData, paymentType) => {
  const token = localStorage.authToken;
  return axios.post(`${APIURL}/${paymentType}`, paymentData, {
    headers: {
      Authorization: token,
    },
  }).then(({ data }) => data);
};
