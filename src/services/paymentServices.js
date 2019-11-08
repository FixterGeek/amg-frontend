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


export const getPaymentsByUser = (userId) => {
  const token = localStorage.authToken;
  return axios.get(`${APIURL}?query={"user": "${userId}"}`, {
    headers: {
      Authorization: token,
    },
  }).then(({ data }) => data);
}

export const getPayments = () => {
  const token = localStorage.authToken;
  return axios.get(`${APIURL}`, {
    headers: {
      Authorization: token,
    },
  }).then(({ data }) =>  data);
};

export const postPaymentFromSubsidiary = (paymentPayload) => {
  const token = localStorage.authToken;
  return axios.post(`${APIURL}/`, paymentPayload, {
    headers: {
      Authorization: token,
    },
  }).then(({ data }) => data);
};

export const getSubsidiaryPayments = (subsidiaryId) => {
  const token = localStorage.authToken;
  const filter = subsidiaryId ? `{"filial":"${subsidiaryId}"}` : {};
  return axios.get(`${APIURL}?query=${filter}`, {
    headers: {
      Authorization: token,
    }
  }).then(({ data }) => data);
};

export const patchPaymentForSubsidiary = (paymentId, paymentData) => {
  const token = localStorage.authToken;
  if (paymentData._id) delete paymentData._id;
  return axios.patch(`${APIURL}/${paymentId}`, paymentData, {
    headers: {
      Authorization: token,
    },
  }).then(({ data }) => data);
};
